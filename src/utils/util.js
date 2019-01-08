const formatNumber = n => {
  const num = n.toString();
  return num[1] ? num : `0${num}`;
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')  } ${  [hour, minute, second].map(formatNumber).join(':')}`
}

const codeParser = (value) => {
  const re = /^https?:\/\/flian.iask.in\/tracing\/code\/(\d+)/;
  const match = re.exec(value);
  if (match) {
    return match[1];
  }
  return false;
}


module.exports = {
  formatTime,
  codeParser,
}
