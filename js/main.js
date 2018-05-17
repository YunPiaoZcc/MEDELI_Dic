/**
 * Created by xianbr on 2018/5/08.
 */

// 导入通用列表
$(function () {

        // 列表路径
        var url = "./resources/database/" + "产品功能列表20180515.xlsx";       

        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";
        oReq.onload = function (e) {
          var arraybuffer = oReq.response;
          var data = new Uint8Array(arraybuffer);
          var arr = [];
          for (var i = 0; i != data.length; ++i)
            arr[i] = String.fromCharCode(data[i]);

          var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type: "binary"});    // Excel对象

            console.log("表格导入成功！");

            var EnglishObj = {};
            var EnglishTemp = {};

            var ChineseObj = {};
            var ChineseTemp = {};

            var EngDatabase = [];
            var ChnDatabase = [];

            var english = "";
            var phonogram = "";
            var voice = "";
            var chinese = "";
            var yamaha = "";
            var casio = "";
            var desc = "";

            var sheet = workbook.Sheets["Sheet1"];
            // 将要处理的sheet转换为数组json对象：[{ }, { }, { }]
            var sheetArrayJson = XLSX.utils.sheet_to_json(sheet, {header: "A"});

            // var category = ["VOICE", "STYLE", "PRODUCTION", "OTHER", "MUSIC", "FUNCTION", "EFFECT", "CONNECTOR"]

            for(var z=1; z < sheetArrayJson.length; z++){
            	if (sheetArrayJson[z]["A"]) {

                // if (category.indexOf(sheetArrayJson[z]["A"]) == -1) {
                  english = sheetArrayJson[z]["A"];
                  EngDatabase.push(english);

                  if (sheetArrayJson[z]["B"] != undefined) {
                    phonogram = sheetArrayJson[z]["B"];
                  } else {
                    phonogram = "无";
                  }

                  if (sheetArrayJson[z]["C"] != undefined) {
                    voice = sheetArrayJson[z]["C"];
                  } else {
                    voice = "";
                  }

                  if (sheetArrayJson[z]["D"] != undefined) {
                    chinese = sheetArrayJson[z]["D"];
                  } else {
                    chinese = "无";
                  }

                  if (sheetArrayJson[z]["E"] != undefined) {
                    yamaha = sheetArrayJson[z]["E"];
                  } else {
                    yamaha = "无";
                  }

                  if (sheetArrayJson[z]["F"] != undefined) {
                    casio = sheetArrayJson[z]["F"];
                  } else {
                    casio = "无";
                  }

                  if (sheetArrayJson[z]["G"] != undefined) {
                    desc = sheetArrayJson[z]["G"];
                  } else {
                    desc = "无";
                  }

                  EnglishTemp = { phonogram: phonogram, voice: voice, chinese: chinese, yamaha: yamaha, casio: casio, desc: desc };
                  EnglishObj[english] = EnglishTemp;
                // } 
              }
            }

            // console.log(EnglishObj);

            var voiceIndex = EngDatabase.indexOf("VOICE");
            var styleIndex = EngDatabase.indexOf("STYLE");
            var productionIndex = EngDatabase.indexOf("PRODUCTION");
            var otherIndex = EngDatabase.indexOf("OTHER");
            var musicIndex = EngDatabase.indexOf("MUSIC");
            var functionIndex = EngDatabase.indexOf("FUNCTION");
            var effectIndex = EngDatabase.indexOf("EFFECT");
            var connectorIndex = EngDatabase.indexOf("CONNECTOR");


            var voiceDatabase = EngDatabase.slice(voiceIndex + 1, styleIndex);
            var styleDatabase = EngDatabase.slice(styleIndex + 1, productionIndex);
            var productionDatabase = EngDatabase.slice(productionIndex + 1, otherIndex);
            var otherDatabase = EngDatabase.slice(otherIndex + 1, musicIndex);
            var musicDatabase = EngDatabase.slice(musicIndex + 1, functionIndex);
            var functionDatabase = EngDatabase.slice(functionIndex + 1, effectIndex);
            var effectDatabase = EngDatabase.slice(effectIndex + 1, connectorIndex);
            var connectorDatabase = EngDatabase.slice(connectorIndex + 1, EngDatabase.length);


            // console.log(voiceDatabase);
            // console.log(styleDatabase);
            // console.log(productionDatabase);
            // console.log(otherDatabase);
            // console.log(musicDatabase);
            // console.log(functionDatabase);
            // console.log(effectDatabase);
            // console.log(connectorDatabase);


            for(var y=1; y < sheetArrayJson.length; y++){
              if (sheetArrayJson[y]["D"] != undefined) {

                chinese = sheetArrayJson[y]["D"];
                ChnDatabase.push(chinese);

                if (sheetArrayJson[y]["A"] != undefined) {
                  english = sheetArrayJson[y]["A"];
                } else {
                  english = "无";
                }

                if (sheetArrayJson[y]["B"] != undefined) {
                  phonogram = sheetArrayJson[y]["B"];
                } else {
                  phonogram = "无";
                }

                if (sheetArrayJson[y]["E"] != undefined) {
                  yamaha = sheetArrayJson[y]["E"];
                } else {
                  yamaha = "无";
                }

                if (sheetArrayJson[y]["F"] != undefined) {
                  casio = sheetArrayJson[y]["F"];
                } else {
                  casio = "无";
                }

                if (sheetArrayJson[y]["G"] != undefined) {
                  desc = sheetArrayJson[y]["G"];
                } else {
                  desc = "无";
                }

                ChineseTemp = { english: english, phonogram: phonogram, yamaha: yamaha, casio: casio, desc: desc };
                ChineseObj[chinese] = ChineseTemp;
              }
            }


            $("#translate").click(function(){

              if ($("#englishTxt").val()) {
               if (EnglishObj[$("#englishTxt").val()]) {
                 $("#phonogram").val(EnglishObj[$("#englishTxt").val()]['phonogram']);
                 $("#chineseTxt").val(EnglishObj[$("#englishTxt").val()]['chinese']);
                 $("#yamaha").val(EnglishObj[$("#englishTxt").val()]['yamaha']);
                 $("#casio").val(EnglishObj[$("#englishTxt").val()]['casio']);
                 $("#desc").text(EnglishObj[$("#englishTxt").val()]['desc']);
               } else {
                 alert("词库中没有找到该英文!");
               }
             } else if ($("#chineseTxt").val() && !$("#englishTxt").val()) {
               if (ChineseObj[$("#chineseTxt").val()]) {
                 $("#englishTxt").val(ChineseObj[$("#chineseTxt").val()]['english']);
                 $("#phonogram").val(ChineseObj[$("#chineseTxt").val()]['phonogram']);
                 $("#yamaha").val(ChineseObj[$("#chineseTxt").val()]['yamaha']);
                 $("#casio").val(ChineseObj[$("#chineseTxt").val()]['casio']);
                 $("#desc").text(ChineseObj[$("#chineseTxt").val()]['desc']);
               } else {
                 alert("词库中没有找到该中文!");
               }
             } else if (!$("#chineseTxt").val() && !$("#englishTxt").val()) {
               alert("请输入英文或中文!");
             }
           });

            $("#clear").click(function() {
              $("#englishTxt").val("").blur();
              $("#phonogram").val("");
              $("#chineseTxt").val("");
              $("#yamaha").val("");
              $("#casio").val("");
              $("#desc").text("");
            });


            $.fn.typeahead.Constructor.prototype.blur = function() {
              var that = this;
              setTimeout(function () { that.hide() }, 250);
            };

            $('#englishTxt').typeahead({
              source: function(query, process) {
                return EngDatabase;
              },
              items: 50,
              minLength: 1
            });

            $('#chineseTxt').typeahead({
              source: function(query, process) {
                return ChnDatabase;
              }
            });


            $("#VOICE").click(function() {
              $("#englishTxt").val(voiceDatabase[0]);
              $("#translate").click();
            });
            
            $("#STYLE").click(function() {
              $("#englishTxt").val(styleDatabase[0]);
              $("#translate").click();
            });

            $("#PRODUCTION").click(function() {
              $("#englishTxt").val(productionDatabase[0]);
              $("#translate").click();
            });

            $("#OTHER").click(function() {
              $("#englishTxt").val(otherDatabase[0]);
              $("#translate").click();
            });

            $("#MUSIC").click(function() {
              $("#englishTxt").val(musicDatabase[0]);
              $("#translate").click();
            });
            
            $("#FUNCTION").click(function() {
              $("#englishTxt").val(functionDatabase[0]);
              $("#translate").click();
            });

            $("#EFFECT").click(function() {
              $("#englishTxt").val(effectDatabase[0]);
              $("#translate").click();
            });

            $("#CONNECTOR").click(function() {
              $("#englishTxt").val(connectorDatabase[0]);
              $("#translate").click();
            });






            // 发音
            $("#voice").click(function() {
              if ($("#englishTxt").val()) {
                if (EnglishObj[$("#englishTxt").val()]['voice']) {
                  var path = "./resources/mp3/" + EnglishObj[$("#englishTxt").val()]['voice'] + ".mp3";
                  $("#player").attr('src',path);
                  var player = $("#player")[0];  
                  player.play(); 
                } else {
                  alert("发音库中没有该音频！");
                }
              }
            });

            // next
            $("#next").click(function() {
              var currentTxt = $("#englishTxt").val();
              var index = EngDatabase.indexOf(currentTxt);
              if (EngDatabase[index]) {
                index = index + 1;
                if (EngDatabase[index]) {
                  $("#englishTxt").val(EngDatabase[index]);
                  $("#translate").click(); 
                }
              } else {
                return;
              }
            });


            // prev
            $("#prev").click(function() {
              var currentTxt = $("#englishTxt").val();
              var index = EngDatabase.indexOf(currentTxt);
              if (EngDatabase[index]) {
                index = index - 1;
                if (EngDatabase[index]) {
                  $("#englishTxt").val(EngDatabase[index]);
                  $("#translate").click();   
                }
              } else {
                return;
              }    
            });
          };

          $("#a").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'a');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
            // $('#englishTxt').blur();
          });
          $("#b").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'b');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#c").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'c');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#d").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'd');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#e").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'e');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#f").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'f');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#g").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'g');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#h").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'h');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#i").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'i');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#j").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'j');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#k").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'k');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#l").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'l');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#m").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'm');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          }); 
          $("#n").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'n');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#o").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'o');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#p").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'p');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#q").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'q');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#r").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'r');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#s").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 's');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#t").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 't');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#u").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'u');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#v").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'v');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#w").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'w');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#x").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'x');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#y").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'y');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });
          $("#z").click(function() {
            $("#englishTxt").val($("#englishTxt").val() + 'z');
            e = $.Event("keyup");
            $('#englishTxt').trigger(e);
          });

          oReq.send();
        });
