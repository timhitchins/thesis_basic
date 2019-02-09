//global map object

require([
  'esri/map',
  'esri/tasks/GeometryService',
  'esri/layers/ArcGISTiledMapServiceLayer',
  'esri/layers/FeatureLayer',
  'esri/dijit/editing/Editor',
  'esri/dijit/editing/TemplatePicker',
  'esri/config',
  'esri/dijit/HomeButton',
  'dojo/_base/array',
  'dojo/parser',
  'dojo/keys',
  'dijit/layout/BorderContainer',
  'dijit/layout/ContentPane',
  'dojo/domReady!'
], function(
  Map,
  GeometryService,
  ArcGISTiledMapServiceLayer,
  FeatureLayer,
  Editor,
  TemplatePicker,
  esriConfig,
  HomeButton,
  arrayUtils,
  parser
) {
  parser.parse();

  //default geometry service
  //I used this one but it is
  //not considered the best practice
  esriConfig.defaults.geometryService = new GeometryService(
    'https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer'
  );
  var map;
  map = new Map('map', {
    sliderPosition: 'top-left',
    sliderStyle: 'large'
  });

  //construct tiled service layer
  var tiled = new ArcGISTiledMapServiceLayer(
    'http://atlas.geog.pdx.edu/arcgis/rest/services/Deschutes_Ochoco_Interactive_2_8_16/MapServer'
  );

  var featureLayer = new FeatureLayer(
    'http://services2.arcgis.com/6Miy5NqQWjMYTGFY/arcgis/rest/services/deschutes_v3_9en/FeatureServer/0',
    {
      mode: FeatureLayer.MODE_ONDEMAND,
      outFields: ['*']
    }
  );

  //definition expression
  featureLayer.setDefinitionExpression("AIN = '" + ain + "'");

  //home button
  var home = new HomeButton(
    {
      map: map
    },
    'HomeButton'
  );
  home.startup();

  //build funtion to initiate
  //the editor with proper template
  //and layers
  function initEditor(evt) {
    var templateLayers = arrayUtils.map(evt.layers, function(result) {
      return result.layer;
    });

    //construct the template picker
    var templatePicker = new TemplatePicker(
      {
        featureLayers: templateLayers,
        grouping: true,
        rows: 'auto',
        columns: 2,
        showTooltip: true
      },
      'templateDiv'
    );
    templatePicker.startup();

    //layers to be added to editor
    var layers = arrayUtils.map(evt.layers, function(result) {
      return { featureLayer: result.layer };
    });

    //editor settings
    var settings = {
      map: map,
      templatePicker: templatePicker,
      layerInfos: layers,
      toolbarVisible: false
    };

    var params = { settings: settings };

    //construct the editor and start it up
    var myEditor = new Editor(params, 'editorDiv');
    myEditor.startup();
  }

  //add tiled layer
  map.addLayer(tiled);

  //add feature layers(s)
  map.addLayers([featureLayer]);

  //finally initate the editor
  //after the layers have loaded
  //evt object is passed to initEditor
  map.on('layers-add-result', initEditor);
});
