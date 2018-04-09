var BaseModel = require('./BaseModel.js');

var data = {
    "user_id": "*****", //员工id-当前操作人id，必须
    "info_cmpt_id": "*****", //信息点组件id,必须
    "god_hand_note": "*****", //上帝之手页面标注
    "saas_note": "*****", //Saas平台页面标注
    "saas_show_flag": "*****", //Saas平台是否显示，0-不显示、1-显示、2-不显示且不可编辑
    "app_note": "*****", //APP工单执行页面标注
    "app_show_flag": "*****", //APP采集是否显示，0-不显示、1-显示、2-不显示且不可编辑
};






console.log(JSON.stringify(new BaseModel(data)));