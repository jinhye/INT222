   window.onload = function(){
      var canvas = document.getElementById("myCanvas");
      canvas.width  = 312;
      canvas.height = 260;

      var context = canvas.getContext("2d");

      context.shadowOffsetX = 5;
      context.shadowOffsetY = 5;
      context.shadowBlur = 10;
      context.shadowColor = "#336699";

      context.rotate(0.1);

      var destX = 5;
      var destY = 5;
      var destWidth = 292;
      var destHeight = 220;
      var imageObj = new Image();

      imageObj.onload = function(){
                 context.drawImage(imageObj, destX, destY, destWidth, destHeight);
      }
      imageObj.src = "includes/mypicture.jpg";
   }