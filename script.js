let selectedTool = null;
let lcdRemoved = false;
let boardScrewsRemoved = [false, false, false, false];

function selectTool(tool) {
  selectedTool = tool;
  const name = tool === 'star' ? '星形ドライバー' : 'ヘラ';
  logMsg(`現在の工具：${name}`);
}

function removeLcd() {
  if (lcdRemoved) return;
  if (selectedTool !== 'spudger') {
    return logMsg("液晶を外すにはヘラが必要です！");
  }
  lcdRemoved = true;
  document.getElementById("lcdPanel").style.display = "none";
  document.getElementById("mainBoard").style.display = "block";

  for (let i = 1; i <= 4; i++) {
    document.getElementById(`innerScrew${i}`).style.display = "block";
  }
  logMsg("液晶を外しました。次は基板のネジを外してください。");
}

function removeInnerScrew(index) {
  if (selectedTool !== 'star') {
    return logMsg("基板のネジには星形ドライバーが必要です！");
  }
  const el = document.getElementById(`innerScrew${index}`);
  if (!boardScrewsRemoved[index - 1]) {
    el.style.display = "none";
    boardScrewsRemoved[index - 1] = true;
    logMsg(`ネジ${index}を外しました`);

    if (boardScrewsRemoved.every(Boolean)) {
      logMsg("すべてのネジを外しました。基板をクリックして取り外してください。");
    }
  }
}

function removeBoard() {
  if (!boardScrewsRemoved.every(Boolean)) {
    return logMsg("すべてのネジを外してください！");
  }
  document.getElementById("mainBoard").style.display = "none";
  document.getElementById("mainBoardBack").style.display = "block";
  logMsg("基板を取り外しました。裏側が残っています。");
}

function logMsg(msg) {
  document.getElementById("log").innerText = msg;
}
