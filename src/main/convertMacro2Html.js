export default function convertMacro2Html(inStr, meRole) {
  let ret = inStr;
  let tankClass = 'tank';
  let dpsClass = 'dps';
  let meleeClass = 'dps';
  let rangeClass = 'dps';
  let healerClass = 'healer';
  switch (meRole) {
    case 'MT':
    case 'ST':
      tankClass = 'tank me';
      break;
    case 'D1':
    case 'D2':
      dpsClass = 'dps me';
      meleeClass = 'dps me';
      break;
    case 'D3':
    case 'D4':
      dpsClass = 'dps me';
      rangeClass = 'dps me';
      break;
    case 'H1':
    case 'H2':
      healerClass = 'healer me';
      break;
    default:
      break;
  }
  // trim
  // 行頭用
  ret = ret.replace(/^(\[\d?\d:\d\d\] )?\([^)]*\)/g, '');
  // ２行目以降用
  ret = ret.replace(/\r?\n(\[\d?\d:\d\d\] )?\([^)]*\)/g, '\n');
  // マクロ用(1行目)
  ret = ret.replace(/^\/p/g, '');
  // マクロ用(2行目以降)
  ret = ret.replace(/\r?\n\/p/g, '\n');

  ret = ret.replace(/　/g, '  '); // eslint-disable-line no-irregular-whitespace
  ret = ret.replace(/</g, '&lt;');
  ret = ret.replace(/>/g, '&gt;');

  ret = ret.replace(/[MSＭＳ][TＴ]/g, "<span class='tank'>$&</span>");
  ret = ret.replace(/([^MSＭＳ])([TＴ])/g, `$1<span class='${tankClass}'>$2</span>`);
  ret = ret.replace(/タンク/g, `<span class='${tankClass}'>$&</span>`);
  ret = ret.replace(/[DＤ][1-4１-４]/g, "<span class='dps'>$&</span>");
  ret = ret.replace(/([DＤ])([^1-4１-４P])/g, `<span class='${dpsClass}'>$1</span>$2`);
  ret = ret.replace(/(DPS|ＤＰＳ)/g, `<span class='${dpsClass}'>$&</span>`);
  ret = ret.replace(/近接?/g, `<span class='${meleeClass}'>$&</span>`);
  ret = ret.replace(/メレー/g, `<span class='${meleeClass}'>$&</span>`);
  ret = ret.replace(/遠隔?/g, `<span class='${rangeClass}'>$&</span>`);
  ret = ret.replace(/レンジ/g, `<span class='${rangeClass}'>$&</span>`);
  ret = ret.replace(/[HＨ][1-2１-２]/g, "<span class='healer'>$&</span>");
  ret = ret.replace(/([HＨ])([^1-2１-２])/g, `<span class='${healerClass}'>$1</span>$2`);
  ret = ret.replace(/ヒーラー/g, `<span class='${healerClass}'>$&</span>`);
  ret = ret.replace(/ヒラ/g, `<span class='${healerClass}'>$&</span>`);
  ret = ret.replace(/[AＡ]([^oOｏＯ]|$)/g, "<span class='marker-A'>A</span>$1");
  ret = ret.replace(/[BＢ]/g, "<span class='marker-B'>B</span>");
  ret = ret.replace(/[CＣ]/g, "<span class='marker-C'>C</span>");
  ret = ret.replace(/([^HDＨＤ])([1１])/g, "$1<span class='marker-1'>$2</span>");
  ret = ret.replace(/([^HDＨＤ])([2２])/g, "$1<span class='marker-2'>$2</span>");
  if (meRole) {
    const re = new RegExp(meRole, 'g');
    ret = ret.replace(re, "<span class='me'>$&</span>");
  }
  return ret;
}
