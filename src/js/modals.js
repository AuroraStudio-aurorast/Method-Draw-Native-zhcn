// globals
const svgCanvas = new $.SvgCanvas(document.getElementById("svgcanvas"));
const editor = new MD.Editor();
const state = new State();

editor.modal = {
  about: new MD.Modal({
    html: `
      <h1>关于该软件</h1>
      <h3>Version 1.0.1</h3>
      <p>Method Draw 是一个简单的<a href="https://github.com/methodofaction/Method-Draw">开源</a>矢量绘图软件。Method Draw 是几年前的<a href="https://github.com/SVG-Edit/svgedit">SVG-Edit</a>的分支，目的是改进并现代化用户界面。 </p>
      <p>在这时(2021)，作者(<a href="http://method.ac/writing">Mark MacKay</a>)正在努力提高稳定性和改进代码库，其中包含大量的遗留实践。我们的目标是创建一个适用于简单图形设计任务的矢量编辑器。</p>
      <hr />
      <p>使用<a href="http://tauri.app">tauri</a>开发进行二次开发，由AuroraStudio进行本地化开发以及汉化</p>
      <p>顺便解决了一些原版的文本表意问题~</p>
      `
  }),
  source: new MD.Modal({
    html: `
      <div id="svg_source_editor">
        <div id="svg_source_overlay" class="overlay"></div>
        <div id="svg_source_container">
          <form>
            <textarea id="svg_source_textarea" spellcheck="false"></textarea>
          </form>
          <div id="tool_source_back" class="toolbar_button">
            <button id="tool_source_cancel" class="cancel">取消</button>
            <button id="tool_source_save" class="ok">应用修改</button>
          </div>
        </div>
    </div>`,
    js: function(el){
      el.children[0].classList.add("modal-item-source");
      el.querySelector("#tool_source_save").addEventListener("click", function(){
        var saveChanges = function() {
          svgCanvas.clearSelection();
          $('#svg_source_textarea').blur();
          editor.zoom.multiply(1);
          editor.rulers.update();
          editor.paintBox.fill.prep();
          editor.paintBox.stroke.prep();
          editor.modal.source.close();
        }

        if (!svgCanvas.setSvgString($('#svg_source_textarea').val())) {
          $.confirm("在你的SVG源中存在解析错误。\n重新回到原始SVG源？", function(ok) {
            if(!ok) return false;
            saveChanges();
          });
        } else {
          saveChanges();
        } 
      })
      el.querySelector("#tool_source_cancel").addEventListener("click", function(){
        editor.modal.source.close();
      });
    }
  }),
  configure: new MD.Modal({
    html: `
      <h1>配置</h1>
      <div id="configuration">
        <button class="warning">清除所有数据</button>
        </div>
      </div>`,
    js: function(el){
      const input = el.querySelector("#configuration button.warning");
      input.addEventListener("click", function(){
        state.clean();
      })
    }
  }),
  donate: new MD.Modal({
    html: `
      <h1>Donate</h1>
      <p>
        Method Draw relies on your generous donations for continued development.
        <a href="https://method.ac/donate/">Donate now</a> if you find this application useful.
      </p>`
  }),
  shortcuts: new MD.Modal({
    html: `
      <h1>快捷键</h1>
      <div id="shortcuts"></div>`,
    js: function(el){
      el.children[0].classList.add("modal-item-wide");
    }
  })
};