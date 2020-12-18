document.getElementById("text").textContent = new URL(
  window.location.href
).searchParams.get("value") + " " + new URL(
  window.location.href
).searchParams.get("unit");


d3plus
  .textwrap()
  .container(d3.select("#text"))
  .resize(false)
  .align("center")
  .valign("middle")   
  .draw();
