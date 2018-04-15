
function Plot()
{

	if(this.pauseFlag == 0 || this.forcePlot == 1)
	{
		this.forcePlot = 0;
		if(this.zoomFlag == 0)
		{
			this.x = gx.slice(0, this.y[0].length);
			this.xPlot = this.x.slice(0, this.x.length);

			if(this.maxHFlag == 1) //zoomFlag = 0 &  maxHFlag = 1
			{
				for(i = 0; i < this.plotNum; i++)
				{
					this.yPlot[i] = FindMaxH(this.y[i], this.maxHoldBuffer[i]);
					this.maxHoldBuffer[i] = this.yPlot[i].slice();
				}

			}
			else //zoomFlag = 0 &  maxHFlag = 0
			{
				for(i = 0; i < this.plotNum; i++)
				{
					this.yPlot[i] = this.y[i].slice();

				}
			}
		}

		else //zoomflag = 1
		{
			for(i = 0; i < this.plotNum; i++)
			{
				if(this.maxHFlag == 1)
				{
					out = [];
					out = FindMaxH(this.y[i], this.maxHoldBuffer[i]);
					this.maxHoldBuffer[i] = [];
					this.maxHoldBuffer[i] = out.slice();
					this.yPlot[i] = out.slice(this.sxIndex, this.exIndex);
				}
				else
				{
					this.yPlot[i] = this.y[i].slice(this.sxIndex, this.exIndex + 1);
				}
			}
		}


		if(this.avgFlag == 1)
		{
			for(i = 0; i < this.plotNum; i++)
			{
				this.avgAcc[i] = ArrangeAvg(this.avgAcc[i], this.yPlot[i], this.accNum);
				this.yPlot[i] = [];
				this.yPlot[i] = CalcAvg(this.avgAcc[i], this.abs);
			}
		}

		if(this.dbFlag == 1)
		{
			for(i = 0; i < this.plotNum; i++)
			{
				for(j = 0; j < this.yPlot[i].length; j++ )
				{
					this.yPlot[i][j] = db(this.yPlot[i][j]) + this.dbOffset;
				}
			}
		}


		this.ctx1.beginPath();
		this.ctx4.clearRect(0, 0, this.canvas1.width, this.canvas2.height);
		this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas2.height);

		//backGround
		this.ctx1.rect(0, 0, this.canvas1.width, this.canvas1.height);
		this.ctx1.fillStyle = "black";
		this.ctx1.fill();
		this.ctx1.lineWidth = "1";
		this.ctx1.stroke();
		this.ctx1.closePath();

		//label
		this.ctx1.beginPath();
		this.ctx1.fillStyle = "yellow";
		this.ctx1.font="20px Arial";
		w = this.ctx1.measureText(this.label).width;
		this.ctx1.fillText(this.label, this.canvas1.width / 2  - w / 2, 2 * padding.y / 3);
		this.ctx1.stroke();
		this.ctx1.closePath();

		pos = 10;
		this.ctx1.font="15px Arial";
		var colors = ['red', 'yellow', 'green', 'orange', 'blue'];

		//labels for subplots
		this.ctx1.beginPath();
		this.ctx1.lineWidth = "2";
		this.ctx1.fillStyle = "white";
		this.ctx1.font="12px Arial";
		var h = parseInt(this.ctx1.font);
		for(i = 0; i < this.plotNum; i++)
		{
			if(this.plotLabels[i] != null)
			{
				this.ctx1.beginPath();
				this.ctx1.strokeStyle = colors[i];
				tempX = this.canvas1.width - padding.x.right + padding.x.right / 8;
				tempY = padding.y + 2 * h * i;
				this.ctx1.moveTo(tempX, tempY);

				tempX += padding.x.right / 5;//lenght of line
				this.ctx1.lineTo(tempX, tempY);

				//text
				tempX += padding.x.right / 16;
				this.ctx1.fillText(this.plotLabels[i], tempX, tempY + h / 4);
				this.ctx1.stroke();
				this.ctx1.closePath();
			}
		}


		this.ctx1.stroke();
		this.ctx1.closePath();


		if(this.zoomFlag == 0)
		{
			if(this.refLevel == -1)
			{
				if(this.settings.autoScaleFlag == true)
				{
					minY = Infinity;
					maxY = -Infinity;
					for(i = 0; i < this.plotNum; i++)
					{
						temp = Math.max.apply(null, this.yPlot[i]);
						if(temp > maxY)
						{
							maxY  = temp
						}

						temp = Math.min.apply(null, this.yPlot[i]);
						if(temp  < minY)
						{
							minY = temp;
						}
					}

					if(maxY - minY > 2)
					{
						maxY = Math.round(maxY);
						minY = Math.round(minY);
					}
					this.maxYOrig = maxY;
					this.minYOrig = minY;

					if(maxY == Infinity || minY == -Infinity)
					{
						//alert("Infinity Number");
					}


					//d baraye on ast ta step ha addade ghabeleghabuli shavad
					if(minY != maxY)
					{
						d = (maxY - minY) / 5;
						this.countOfDec = 0;

						ans = GetExpoValues(d);
						this.base = ans.base;
						this.power = ans.power;

						d = Math.round(this.base * 10);

						//temp = Math.pow(10, d.toString().length - 1);
						//d = d + temp - (d % temp);
						d = d * Math.pow(10, this.power - 1);


						if(Math.abs(minY) % d != 0)
						{
							if(minY < 0)
								minY = minY + (Math.abs(minY) % d) - d;
							else
								minY = minY - (minY % d);
						}

						if(maxY % d != 0)
						{
							if(maxY > 0)
							{
								maxY = maxY + d - (maxY % d);
							}
							else
							{
								maxY = maxY - (maxY % d);
							}
						}
					}

					else
					{
						temp = maxY;
						maxY = temp + 1;
						minY = temp - 1;
						d = 1;
					}

					this.AXES_STEP_NUM_Y = Math.ceil((maxY - minY) / d);
				}
				else
				{
					maxY = this.settings.yAxisMaxVal;
					minY = this.settings.yAxisMinVal;
					d = (maxY - minY) / 5;
					this.AXES_STEP_NUM_Y = Math.ceil((maxY - minY) / d);
				}

			}

			else
			{
				maxY = this.refLevel;
				minY = this.refLevel - 140;
				d = 20;
				this.AXES_STEP_NUM_Y = Math.ceil((maxY - minY) / d);
			}



			maxX = Math.max.apply(null, this.xPlot);
			minX = Math.min.apply(null, this.xPlot);
			this.maxXOrig = maxX;
			this.minXOrig = minX;

			//X
			d = maxX - minX;
			d = Math.round(d / 10);
			temp = Math.pow(10, d.toString().length - 1);
			d = d + temp - (d % temp);


			//minX = minX - minX % d;
			if(Math.abs(minX) % d != 0)
			{
				if(minX < 0)
					minX = minX + (Math.abs(minX) % d) - d;
				else
					minX = minX - (minX % d);
			}

			if(maxX % d != 0)
				maxX = maxX + d - (maxX % d);// mihahim maxX mazrabe d bashad

			this.AXES_STEP_NUM_X = (maxX - minX) / d;

			this.maxX = maxX;
			this.minX = minX;
			this.maxY = maxY;
			this.minY = minY;

			sx = this.maxX - this.minX;
			this.scaleX = this.canvas1.width / sx - (padding.x.left + padding.x.right) / sx;
			s = this.maxY - this.minY;//;
			this.scaleY = this.canvas1.height / 1 / (s) - 2 * padding.y / (s);
			scale = 1;

		}//end of if autoscale flag == 1

		else
		{
			this.minX = this.zoomMinX;
			this.minY = this.zoomMinY;
			this.maxX = this.zoomMaxX;
			this.maxY = this.zoomMaxY;
		}

		showAxes(this);



		this.ctx4.lineWidth = "2";
		this.ctx4.beginPath();
		jump = Math.floor(this.yPlot[0].length / (this.canvas1.width));
		if(jump == 0)
		{
			jump = 1;
		}
		/*if(this.label == "Pd")
		  {
		  jump = 1;
		  }*/
		if(jump == 0)
		{
			return;
		}

		WritePlotInfo(this);
		var i, j, t;

		for(j = 0; j < this.plotNum; j++)
		{
			this.ctx4.stroke();
			this.ctx4.closePath();
			this.ctx4.beginPath();
			this.ctx4.strokeStyle = colors[j];
			this.ctx4.moveTo(this, FindX(this, this.xPlot[0]), FindY(this, this.yPlot[j][0]));
			num = this.xPlot.length;//minX va maxX faghat baraye namayesh ast va dar plot az onha estefade nemokonim
			if(num == 0)
			{
				break;
			}
			//if(this.dotFlag == 0)
			{
				for (var i = 0; i < num; i+= jump)
				{
					minIndex = i;
					maxIndex = i;
					for(t = i + 1; t < i + jump; t++)
					{
						if(this.yPlot[j][t] > this.yPlot[j][maxIndex])
						{
							maxIndex = t;
						}
						else if(this.yPlot[j][t] < this.yPlot[j][minIndex])
						{
							minIndex = t;
						}
					}

					xx = FindX(this, this.xPlot[minIndex]) - padding.x.left;
					yy = FindY(this, this.yPlot[j][minIndex]) - padding.y;

					if(this.dotFlag == 0)
					{
						this.ctx4.lineTo(xx, yy);
					}
					else
					{
						this.ctx4.arc(xx - 1.5, yy - 1.5, 3, 0, 2 * Math.PI);
					}

					if(jump != 1)
					{
						xx = FindX(this, this.xPlot[maxIndex]) - padding.x.left;
						yy = FindY(this, this.yPlot[j][maxIndex]) - padding.y;

						if(this.dotFlag == 0)
						{
							this.ctx4.lineTo(xx, yy);
						}
						else
						{
							this.ctx4.arc(xx - 1.5, yy - 1.5, 3, 0, 2 * Math.PI);
						}
					}
				}
			}

			if(typeof this.dWinPosDop != 'undefined')
			{
				this.ctx4.stroke();
				this.ctx4.beginPath();

				this.ctx4.strokeStyle = 'white';
				xx = FindX(this, this.dWinPosDop - this.dWinWidthDop / 2) - padding.x.left;
				this.ctx4.moveTo(xx , this.canvas4.height);
				this.ctx4.lineTo(xx, 0);


				xx = FindX(this, this.dWinPosDop + this.dWinWidthDop / 2)- padding.x.left;
				this.ctx4.moveTo(xx , this.canvas4.height);
				this.ctx4.lineTo(xx, 0);

				this.ctx4.stroke();
				this.ctx4.beginPath();

				this.ctx4.strokeStyle = 'blue';
				xx = FindX(this, this.dWinPosDopGd - this.dWinWidthDopGd / 2)- padding.x.left;
				this.ctx4.moveTo(xx , this.canvas4.height);
				this.ctx4.lineTo(xx, 0);


				xx = FindX(this, this.dWinPosDopGd + this.dWinWidthDopGd / 2)- padding.x.left;
				this.ctx4.moveTo(xx , this.canvas4.height);
				this.ctx4.lineTo(xx, 0);

				this.ctx4.beginPath();
				this.ctx4.stroke();

			}

		}
		//this.ctx1.clearRect(0, this.canvas1.height - padding.y, this.canvas1.width, padding.y);

		this.ctx4.stroke();
		this.ctx4.stroke();
		WriteMarkers(this);
		this.ctx1.stroke();
		this.ctx1.closePath();

	}
	//$(this.canvas2).trigger("mousemove");

}



