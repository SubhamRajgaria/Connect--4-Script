<script language="JavaScript">
			user = 1
			comp = 2
			dummy = 3
			leer = 0
			fill_checker =  new Array(0,0,0,0,0,0,0);
			fill_checker[0] = new Array(0,0,0,0,0,0);
			fill_checker[1] = new Array(0,0,0,0,0,0);
			fill_checker[2] = new Array(0,0,0,0,0,0);
			fill_checker[3] = new Array(0,0,0,0,0,0);
			fill_checker[4] = new Array(0,0,0,0,0,0);
			fill_checker[5] = new Array(0,0,0,0,0,0);
			fill_checker[6] = new Array(0,0,0,0,0,0);

			row_choice =  new Array(5,5,5,5,5,5,5); 

			function get(column_no, row_no)
			{
				if ((column_no < 0) || (column_no > 6) || (row_no < 0) || (row_no > 5)) 
				{
					return dummy
				}
				else 
				{
					return (fill_checker[column_no][row_no])
				} 
			}       

			function put(column_no,choice)
			{
				if (choice == user) 
					document.getElementById("IEschreiben").innerHTML = document.getElementById("IEschreiben").innerHTML + 
					'<div style="position:absolute; top:'+(row_choice[column_no]*61+68)+'px; left:'+(column_no*60+2)+'px;"><img src="fillblack.gif" width=55 height = 55> </div>';

				if (choice == comp) 
					document.getElementById("IEschreiben").innerHTML = document.getElementById("IEschreiben").innerHTML + 
					'<div style="position:absolute; top:'+(row_choice[column_no]*61+68)+'px; left:'+(column_no*60+2)+'px;"><img src="fillred.gif" width=55 height = 55> </div>';
			}


			var flag = false;

			function column_finder(column_no)
			{
				if (row_choice[column_no] == -1) 
					alert("column full")
				else
				{
					fill_checker[column_no][row_choice[column_no]] = user;
					row_choice[column_no] = row_choice[column_no] - 1;
					put(column_no,user);
					if (proof(column_no,row_choice[column_no]+1,4,user,false) == true) 
					{
						flag=true;
						alert("You win");
						location.reload();
					}
					if (
						(row_choice[0] == -1) && 
						(row_choice[1] == -1) && 
						(row_choice[2] == -1) && 
						(row_choice[3] == -1) && 
						(row_choice[4] == -1) && 
						(row_choice[5] == -1) && 
						(row_choice[6] == -1)) 
						{
							alert("Draw Game");
							location.reload();
						}
					if (flag != true) computer();       	
				}
			}

			function proof(x, y, menge, choice, t_f)
			{
				var i,j,k;
				var sum1,sum2,sum3,sum4;
				var sum12,sum22,sum32,sum42;
				var choice2;
				var ja=false;

				if (choice == user) 
				{
					choice2 = comp
				} else 
				{
					choice2 = user
				}; 

				for (k=0;k<=3;k++)
				{
					sum1 = 0;
					sum2 = 0;
					sum3 = 0;
					sum4 = 0;
					sum12 = 0;
					sum22 = 0;
					sum32 = 0;
					sum42 = 0;

					for(j=0;j<=3;j++)
					{
						if (get(x-k+j,y) == choice) {sum1++};
						if (get(x,y-k+j) == choice) {sum2++};
						if (get(x-k+j,y-k+j) == choice) {sum3++};
						if (get(x+k-j,y-k+j) == choice) {sum4++};
						if (get(x-k+j,y) == choice2) {sum12++};
						if (get(x,y-k+j) == choice2) {sum22++};
						if (get(x-k+j,y-k+j) == choice2) {sum32++};
						if (get(x+k-j,y-k+j) == choice2) {sum42++};
						if (get(x-k+j,y) == dummy) {sum12++};
						if (get(x,y-k+j) == dummy) {sum22++};
						if (get(x-k+j,y-k+j) == dummy) {sum32++};
						if (get(x+k-j,y-k+j) == dummy) {sum42++};
					}
					if ((sum1 >= menge) && (sum12 == 0)) {ja = true} else
					if ((sum2 >= menge) && (sum22 == 0)) {ja = true} else
					if ((sum3 >= menge) && (sum32 == 0)) {ja = true} else
					if ((sum4 >= menge) && (sum42 == 0)) ja = true;


					if ((ja == true) && (t_f == true))
					{
						sum12 = 0;
						sum22 = 0;
						sum32 = 0;
						sum42 = 0;
						fill_checker[x][y] = choice;
						row_choice[x]--;

						for(j=0;j<=3;j++)
						{
							if ((sum1 >= menge) && (get(x-k+j,y) == leer) && (get(x-k+j,row_choice[x-k+j]+1) == leer)) sum12++;
							if ((sum2 >= menge) && (get(x,y-k+j) == leer) && (get(x,row_choice[x]+1) == leer)) sum22++;
							if ((sum3 >= menge) && (get(x-k+j,y-k+j) == leer) && (get(x-k+j,row_choice[x-k+j]+1) == leer)) sum32++;
							if ((sum4 >= menge) && (get(x+k-j,y-k+j) == leer) && (get(x+k-j,row_choice[x+k-j]+1) == leer)) sum42++;
						}
						if ((sum12 == 1) || (sum22 == 1) || (sum32 == 1) || (sum42 == 1)) ja = false;
						row_choice[x]++;
						fill_checker[x][y] = leer;
					}
				}
				return ja;
			}

			function computer()
			{
				var x,i,j,k;
				var column_no;
				var zaehler;
				chance = new Array(0,0,0,0,0,0,0);

				chance[0] = 13+Math.random()*4;
				chance[1] = 13+Math.random()*4;
				chance[2] = 16+Math.random()*4;
				chance[3] = 16+Math.random()*4;
				chance[4] = 16+Math.random()*4;
				chance[5] = 13+Math.random()*4;
				chance[6] = 13+Math.random()*4;

				for (i=0;i<=6;i++) 
				{
					if (row_choice[i] < 0) 
					chance[i] = chance[i]-30000;
				}	
	
				for (i=0;i<=6;i++)
				{
					if (proof(i,row_choice[i],3,comp,false) == true) chance[i] = chance[i] + 20000;

					if (proof(i,row_choice[i],3,user,false) == true) chance[i] = chance[i] + 10000;

					if (proof(i,row_choice[i]-1,3,user,false) == true) chance[i] = chance[i] -4000
					if (proof(i,row_choice[i]-1,3,comp,false) == true) chance[i] = chance[i] -200;

					if (proof(i,row_choice[i],2,user,false) == true) chance[i] = chance[i] +50+Math.random()*3;

					if ((proof(i,row_choice[i],2,comp,true) == true) && (row_choice[i] > 0))
					{
						fill_checker[i][row_choice[i]] = comp;
						row_choice[i]--;
						zaehler = 0;
						for(j=0;j<=6;j++) if(proof(j,row_choice[j],3,comp,false) == true) zaehler++;
						if (zaehler == 0) {chance[i] = chance[i] +60+Math.random()*2} else {chance[i] = chance[i] - 60}
						row_choice[i]++;
						fill_checker[i][row_choice[i]] = leer;
					}

					if (proof(i,row_choice[i]-1,2,user,false) == true) chance[i] = chance[i] -10;

					if (proof(i,row_choice[i]-1,2,comp,false) == true) chance[i] = chance[i] -8;

					if (proof(i,row_choice[i],1,user,false) == true) chance[i] = chance[i] +5+Math.random()*2;

					if (proof(i,row_choice[i],1,comp,false) == true) chance[i] = chance[i] +5+Math.random()*2;
	
					if (proof(i,row_choice[i]-1,1,user,false) == true) chance[i] = chance[i] -2;

					if (proof(i,row_choice[i]-1,1,comp,false) == true) chance[i] = chance[i] +1;

					if ((proof(i,row_choice[i],2,comp,true) == true) && (row_choice[i] > 0)) 
					{
						fill_checker[i][row_choice[i]] = comp;
						row_choice[i]--;
						for(k=0;k<=6;k++)       
						if ((proof(k,row_choice[k],3,comp,false) == true) && (row_choice[k] > 0)) 
						{
								fill_checker[k][row_choice[k]] = user;
								row_choice[k]--;
								for(j=0;j<=6;j++) 
								if (proof(j,row_choice[j],3,comp,false) == true) chance[i] = chance[i] + 2000;
								row_choice[k]++;
								fill_checker[k][row_choice[k]] = leer;
						}
						row_choice[i]++;
						fill_checker[i][row_choice[i]] = leer;
					}
					if ((proof(i,row_choice[i],2,user,true) == true) && (row_choice[i] > 0)) 
					{
						fill_checker[i][row_choice[i]] = user;
						row_choice[i]--;
						for(k=0;k<=6;k++)
						if ((proof(k,row_choice[k],3,user,false) == true) && (row_choice[k] > 0)) 
						{
							fill_checker[k][row_choice[k]] = comp;
							row_choice[k]--;
							for(j=0;j<=6;j++)
							if (proof(j,row_choice[j],3,user,false) == true) chance[i] = chance[i] + 1000;
							row_choice[k]++;
							fill_checker[k][row_choice[k]] = leer;
						}
						row_choice[i]++;
						fill_checker[i][row_choice[i]] = leer;
					}       

					if ((proof(i,row_choice[i]-1,2,user,true) == true) && (row_choice[i] > 1))
					{
						fill_checker[i][row_choice[i]] = user;
						row_choice[i]--;
						for(k=0;k<=6;k++)
						if ((proof(k,row_choice[k]-1,3,user,false) == true) && (row_choice[k] > 0))
						{
							fill_checker[k][row_choice[k]] = comp;
							row_choice[k]--;
							for(j=0;j<=6;j++)
							if (proof(j,row_choice[j]-1,3,user,false) == true) chance[i] = chance[i] - 500;
							row_choice[k]++;
							fill_checker[k][row_choice[k]] = leer;
						}
						row_choice[i]++;
						fill_checker[i][row_choice[i]] = leer;
					}


				} // for

				column_no = 0;
				x = -10000;
				for(i=0;i<=6;i++)
				if (chance[i] > x)
				{
					x = chance[i];
					column_no = i;
				}

				fill_checker[column_no][row_choice[column_no]] = comp;
				row_choice[column_no] = row_choice[column_no] - 1;
				put(column_no,comp);
				if (proof(column_no,row_choice[column_no]+1,4,comp,false) == true) 
				{
					alert("You have lost");
					location.reload();
				}
				if ((row_choice[0] == -1) && (row_choice[1] == -1) && (row_choice[2] == -1) && (row_choice[3] == -1) && (row_choice[4] == -1)  && (row_choice[5] == -1) && (row_choice[6] == -1)) 
				{
					alert("Draw game");
					location.reload();
				}
			}
</script>
