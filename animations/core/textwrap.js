var VALUE = new URL(window.location.href).searchParams.get("value");
const UNIT = new URL(window.location.href).searchParams.get("unit");
const TIME = new URL(window.location.href).searchParams.get("time");
const DOMAIN = window.location.pathname.split("/")[1];
const GOAL = new URL(window.location.href).searchParams.get("goal") ? new URL(window.location.href).searchParams.get("goal") : false;

const STICKER_TYPE = new URL(window.location.href).pathname.replace(/\/.{0,}\//gm, '').replace(/-\d.html/gm, '');

function wrapText() {
  if (TIME === "true") 
  // if (DOMAIN === "time")
  {
    document.getElementById("text").textContent = processDefaultTimeText(VALUE, UNIT);
    if (STICKER_TYPE === 'chartjunk') 
    {
      document.getElementById("goal").textContent = processDefaultTimeText(GOAL, UNIT);
      try {
        document.getElementById("midpoint").textContent = processDefaultTimeText(GOAL / 2, UNIT);
      } catch (error) {}
    }
  }
  else 
  {
    document.getElementById("text").textContent = VALUE + " " + UNIT;
    // I'll just move the text here to fix the line wrap issue.
    document.getElementById("analogy").textContent = denominatorDescriptor;
    if (STICKER_TYPE === 'chartjunk') 
    {
      document.getElementById("goal").textContent = GOAL;
      try {
        document.getElementById("midpoint").textContent = GOAL / 2;
      } catch (error) {}
    }
  }
  
  
  if (STICKER_TYPE === 'analogy') 
  {
    d3plus
      .textwrap()
      .container(d3.select("#text"))
      .resize(false)
      .valign("middle") 
      .draw();

    d3plus
      .textwrap()
      .container(d3.select("#analogy"))
      .resize(true)
      .draw();
  }
  else {
    d3plus
    .textwrap()
    .container(d3.select("#text"))
    .resize(false)
    .align("center")
    .valign("middle")   
    .draw();
  }
}

wrapText();