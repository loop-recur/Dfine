// Grid = function(attrs) {
// 	var cellWidth = (attrs.cell_width || 0);
// 	var cellHeight = (attrs.cell_height || 0);
// 	var xSpacer = (attrs.cell_height || 0);
// 	var ySpacer = 10;
// 	var xGrid = 3;
// 	var yGrid = 12;
// 	
// 	
// }
//  
// var tableData = [];
//  
// var colorSet = [
//                 "#D44646",
//                 "#46D463",
//                 "#46D4BE",
//                 "#C2D446",
//                 "#D446D5",
//                 "#4575D5",
//                 "#E39127",
//                 "#879181",
//                 "#E291D4"
//               ];
//  
// var colorSetIndex = 0;
// var cellIndex = 0;
//  
// for (var y=0; y<yGrid; y++){
//     var thisRow = Ti.UI.createTableViewRow({
//         className: "grid",
//         layout: "horizontal",
//         height: cellHeight+(2*ySpacer),
//         selectedBackgroundColor:"red"
//     });
//     for (var x=0; x<xGrid; x++){
//         var thisView = Ti.UI.createView({
//             objName:"grid-view",
//             objIndex:cellIndex.toString(),
//             backgroundColor: colorSet[colorSetIndex],
//             left: ySpacer,
//             height: cellHeight,
//             width: cellWidth
//         });
//  
//         var thisLabel = Ti.UI.createLabel({
//             color:"white",
//             font:{fontSize:48,fontWeight:'bold'},
//             text:cellIndex.toString(),
//             touchEnabled:false
//         });
//         thisView.add(thisLabel);
//         thisRow.add(thisView);
//         cellIndex++;
//         colorSetIndex++;
//  
//         if( colorSetIndex === colorSet.length ){
//             colorSetIndex = 0;
//         }
//     }
//     tableData.push(thisRow);
// }