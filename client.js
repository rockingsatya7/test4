$(document).ready(function(){
   var i=0;
 $("#search").click(function(){
   var data=$("#text").val();
   $.ajax({
                    type : 'post',
                    url :  "http://localhost:3000/post",
                    dataType : "json",
                    data : {str:data},                   
				   crossDomain : true, 
                   success: function(val,err) {      					
					  
				if(val.length==0)
                                  alert("No Results Found");
                                else
					{
                                             for(i=0;i<val.length;i++)
						{
                                                 var str=val[i].split('\r\n');	
						 var str1='';
						 for(j=0;j<str.length;j++)
						 str1+=str[j]+'<br/>';
						 $("#cent").css("border", "5px solid black");
						$("#cent").append($("<table ><tr ><td style='padding:0px'><img src='docs.png' ></td><td><p>"+str1+"</p></td></tr><table><hr>").fadeIn('slow'));
					    }
                                      }
						
						}
						}
						);
						}
						);
						}
						);
						
