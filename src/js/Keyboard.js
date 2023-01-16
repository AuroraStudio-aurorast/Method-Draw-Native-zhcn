MD.Keyboard = function(){

  const keys = {
    "v": { name: "选择工具",         cb: ()=> state.set("canvasMode", "select") },
    "q": { name: "手绘工具",       cb: ()=> state.set("canvasMode", "fhpath") },
    "l": { name: "线条工具",           cb: ()=> state.set("canvasMode", "fhplineath")},
    "r": { name: "矩形工具",      cb: ()=> state.set("canvasMode", "rect")},
    "o": { name: "椭圆工具",        cb: ()=> state.set("canvasMode", "ellipse")},
    "s": { name: "形状工具",          cb: ()=> state.set("canvasMode", "shapelib")},
    "p": { name: "路径工具",           cb: ()=> state.set("canvasMode", "path")},
    "t": { name: "文本工具",           cb: ()=> state.set("canvasMode", "text")},
    "z": { name: "缩放工具",           cb: ()=> state.set("canvasMode", "zoom")},
    "e": { name: "取色工具",     cb: ()=> state.set("canvasMode", "eyedropper")},
    "x": { name: "焦点填充/画笔",   cb: ()=> editor.focusPaint()}, 
"shift_x":   { name: "切换填充/画笔",  cb: ()=> editor.switchPaint()},  
    "alt":   { name: false,                 cb: ()=> $("#workarea").toggleClass("out", state.get("canvasMode") === "zoom" )},  
    "cmd_s": { name: "保存SVG图片",       cb: ()=> editor.save()},
    "cmd_z": { name: "撤销",                cb: ()=> editor.undo()},
    "cmd_y": { name: "重做",                cb: ()=> editor.redo()},
"cmd_shift_z": { name: "重做",              cb: ()=> editor.redo()},
    "cmd_c": { name: "复制",                cb: ()=> editor.copySelected()},
    "cmd_x": { name: "剪切",                 cb: ()=> editor.cutSelected()},
    "cmd_v": { name: "粘贴",               cb: ()=> editor.pasteSelected()},
    "cmd_d": { name: "重复",           cb: ()=> editor.duplicateSelected()},
    "cmd_u": { name: "显示源码",         cb: ()=> editor.source()},
    "cmd_a": { name: "全选",          cb: ()=> svgCanvas.selectAllInCurrentLayer()},
    "cmd_b": { name: "设置粗体",       cb: ()=> editor.text.setBold()},
    "cmd_i": { name: "设置斜体",     cb: ()=> editor.text.setItalic()},
    "cmd_g": { name: "组合选择",      cb: ()=> editor.groupSelected()},
    "cmd_shift_g":  { name: "取消组合",      cb: ()=> editor.ungroupSelected()},
    "cmd_o": { name: "打开SVG图像",       cb: ()=> editor.import.open()},
    "cmd_k": { name: "放置图片",         cb: ()=> editor.import.place()},
    "backspace": { name: "删除",          cb: ()=> editor.deleteSelected()},
    "delete":    { name: "删除",          cb: ()=> editor.deleteSelected()},
    "ctrl_arrowleft":        { name: "旋转-1°",  cb: ()=> editor.rotateSelected(0,1)},
    "ctrl_arrowright":       { name: "旋转+1°",  cb: ()=> editor.rotateSelected(1,1)},
    "ctrl_shift_arrowleft":  { name: "旋转-5°",  cb: ()=> editor.rotateSelected(0,5)},
    "ctrl_shift_arrowright": { name: "旋转+5° ", cb: ()=> editor.rotateSelected(1,5)},
    "shift_o":  { name: "下一件",         cb: ()=> svgCanvas.cycleElement(0)},
    "shift_p":  { name: "上一件",         cb: ()=> svgCanvas.cycleElement(1)},
    "shift_r":  { name: "显示/隐藏标尺",  cb: ()=> editor.rulers.toggleRulers()},
    "cmd_+":  { name: "放大",             cb: ()=> editor.zoom.multiply(1.5)},
    "cmd_-":  { name: "缩小",            cb: ()=> editor.zoom.multiply(0.75)},
    "cmd_=":  { name: "实际大小",         cb: ()=> editor.zoom.reset()},
    "arrowleft":  { name: "向左移动",      cb: ()=> editor.moveSelected(-1,0)},
    "arrowright":  { name: "向右移动",    cb: ()=> editor.moveSelected(1,0)},
    "arrowup":  { name: "向上移动",          cb: ()=> editor.moveSelected(0,-1)},
    "arrowdown":  { name: "向下移动",      cb: ()=> editor.moveSelected(0,1)},
    "shift_arrowleft": {name: "向左跳转",   cb: () => editor.moveSelected(state.get("canvasSnapStep") * -1, 0)},
    "shift_arrowright": {name: "向右跳转", cb: () => editor.moveSelected(state.get("canvasSnapStep") * 1, 0)},
    "shift_arrowup": {name: "向上跳转",       cb: () => editor.moveSelected(0, state.get("canvasSnapStep") * -1)},
    "shift_arrowdown": {name: "向下跳转",   cb: () => editor.moveSelected(0, state.get("canvasSnapStep") * 1)},
    "cmd_arrowup":{ name: "上移一层",   cb: () => editor.moveUpSelected()},
    "cmd_arrowdown":{ name: "下移一层", cb: () => editor.moveDownSelected()},
    "cmd_shift_arrowup":{ name: "置于顶层", cb: () => editor.moveToTopSelected()},
    "cmd_shift_arrowdown":{ name: "置于底层", cb: () => editor.moveToBottomSelected()},
    "escape":  { name: false,    cb: ()=> editor.escapeMode()},
    "enter":    { name: false,   cb: ()=> editor.escapeMode()},
    " ":  { name: "帆布",  cb: (e)=> editor.pan.startPan(e)},
  };

  document.addEventListener("keydown", function(e){
    const exceptions = $(":focus").length || $("#color_picker").is(":visible");
    if (exceptions) return false;
    const modKey = !svgedit.browser.isMac() ? "ctrlKey" : "metaKey";
    const cmd = e[modKey] ? "cmd_" : "";
    const shift = e.shiftKey ? "shift_" : "";
    const key = cmd + shift + e.key.toLowerCase();
    const canvasMode = state.get("canvasMode");
    
    const modalIsOpen = Object.values(editor.modal).filter((modal) => {
      const isHidden = modal.el.classList.contains("hidden");
      if (!isHidden && key === "cmd_enter") modal.confirm();
      if (!isHidden && key === "escape") modal.close();
      return !isHidden;
    }).length;

    // keyboard shortcut exists for app
    if (!modalIsOpen && keys[key]) {
      e.preventDefault();
      keys[key].cb();
    }
  });

  document.addEventListener("keyup", function(e){
    if ($("#color_picker").is(":visible")) return e;
    const canvasMode = state.get("canvasMode");
    const key = e.key.toLowerCase();
    const keys = {
    "alt":     ()=> $("#workarea").removeClass("out"),
    " ": ()=> editor.pan.stopPan(),
    }
    if (keys[key]) {
      e.preventDefault();
      keys[key]();
    }
  })

  // modal shortcuts
  const shortcutEl = document.getElementById("shortcuts");
  const docFrag = document.createDocumentFragment();
  for (const key in keys) {
    const name = keys[key].name;
    if (!name) continue;
    const shortcut = document.createElement("div");
    shortcut.classList.add("shortcut")
    const chords = key.split("_");
    const shortcutKeys = document.createElement("div");
    shortcutKeys.classList.add("shortcut-keys")
    chords.forEach(key => {
      const shortcutKey = document.createElement("div"); 
      shortcutKey.classList.add("shortcut-key");
      if (key === "arrowright") key = "→";
      if (key === "arrowleft") key = "←";
      if (key === "arrowup") key = "↑";
      if (key === "arrowdown") key = "↓";
      if (key === " ") key = "SPACEBAR";
      if (key === "shift") key = "⇧";
      if (key === "cmd") key = svgedit.browser.isMac() ? "⌘" : "Ctrl";
      shortcutKey.textContent = key;
      shortcutKeys.appendChild(shortcutKey);
      shortcut.appendChild(shortcutKeys);
    });

    const shortcutName = document.createElement("div"); 
    shortcutName.classList.add("shortcut-name");
    shortcutName.textContent = name;
    shortcutKeys.appendChild(shortcutName);

    docFrag.appendChild(shortcutKeys);
  }

  shortcutEl.appendChild(docFrag);


}