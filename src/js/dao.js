const dao = [

  // public, appears in builder

  {
    name: "canvasId",
    label: "Canvas ID",
    type: "id",
    default: "",
    private: true,
    save: true
  },

  {
    name: "canvasTitle",
    label: "画布标题",
    type: "string",
    default: "画图",
    private: false,
    save: true
  },

  {
    name: "canvasSize",
    label: "画布大小",
    type: "array",
    default: [800, 600],
    private: false,
    save: true
  },

  {
    name: "canvasSnap",
    label: "抓取到网格",
    type: "boolean",
    default: false,
    private: false,
    save: true
  },

  {
    name: "canvasSnapStep",
    label: "捕捉步骤",
    type: "number",
    default: 10,
    private: false,
    save: true
  },

  {
    name: "canvasRulers",
    label: "画布标尺",
    type: "boolean",
    default: true,
    private: false,
    save: true
  },

  {
    name: "canvasContent",
    label: "画布内容",
    type: "string",
    default: "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'></svg>",
    private: true,
    save: true
  },

  {
    name: "canvasMode",
    label: "画布模式",
    type: "string",
    default: "select",
    private: true,
    save: true
  },

  {
    name: "canvasFill",
    label: "画布填充",
    type: "object",
    default: {type: "solidColor", solidColor: 'ffffff', alpha: 100},
    private: true,
    save: true
  },

  {
    name: "canvasStroke",
    label: "画布画笔",
    type: "object",
    default: {type: "solidColor", solidColor: '000000', alpha: 100},
    private: true,
    save: true
  },

  {
    name: "canvasBackground",
    label: "画布背景",
    type: "object",
    default: {type: "solidColor", solidColor: 'ffffff', alpha: 100},
    private: true,
    save: true
  },

  {
    name: "canvasCreationDate",
    label: "画布创建日期",
    type: "string",
    default: new Date().toString(),
    private: true,
    save: false
  },
  // When this page was created
  {
    name: "canvasLastModified",
    label: "画布上一次修改",
    type: "string",
    default: new Date().toString(),
    private: true,
    save: false
  },
 
  // system level fields
  {
    name: "darkmode",
    label: "暗黑模式",
    type: "boolean",
    default: true,
    private: true,
    save: true,
  },
  // future use
  {
    name: "language",
    label: "语言",
    type: "string",
    default: null,
    private: true,
    save: true,
  },
  // if it is the first time visitor we can onboard them
  {
    name: "visited",
    label: "曾访问过",
    type: "boolean",
    default: false,
    private: true,
    save: true,
  },

];

dao.forEach(thing => {
  thing.clean = function(value){
     if (thing.type === "number") return isNaN(value) ? 0 : parseInt(value, 10);
     if (thing.type === "string") return value  || "";
     if (thing.type === "boolean") return value === "true" || value === true ? true : false;
     if (thing.type === "url") return value || "";
     if (thing.type === "id") return value || 0;
     if (thing.type === "array") return typeof value === "object" ? value : value ? value.split(",") : [];
     if (thing.type === "object") return typeof value === "object" ? value : value ? JSON.parse(value) : {};
     else throw "type " + thing.type + " does not exist";
  }
});
