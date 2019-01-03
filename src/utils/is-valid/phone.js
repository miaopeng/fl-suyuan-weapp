var isValidPhone = function (phone) {
  var phone = phone + '';
  var rePhoneNo = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,2-9]))\d{8}$/;
  return !!phone.match(rePhoneNo);
};

export default isValidPhone;
