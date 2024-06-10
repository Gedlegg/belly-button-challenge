// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    const entries = Object.entries(result);
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      
      // Create a new h6 element for each key-value pair
      let h6 = panel.append("h6");
      
      // Set the text and style for the h6 element
      h6.text(`${key.toUpperCase()}: ${value}`);
      h6.style("color", "gray");
    
    // Set the class of the "Demographic Info" div to `card-header blue`
    d3.selectAll("h6").style("color", "gray");
    d3.selectAll("p").style("color", "gray");
    d3.select(".card-header").style("background-color", "rgba(31, 118, 185, 0.9)");
    d3.select(".card-title").style("color", "white");
    
    };
    // Calculate the width of the select element based on its options
    let selectElement = document.getElementById("selDataset");
    let options = selectElement.getElementsByTagName("option");
    let maxWidth = 0;
    for (let i = 0; i < options.length; i++) {
      let optionWidth = options[i].text.length + 2;
      if (optionWidth > maxWidth) {
        maxWidth = optionWidth;
      }
    }
    selectElement.style.width = maxWidth + "ch";
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
    let trace1 =   {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }

    let bubbleData = [trace1];
    
    let bubbleLayout = {
      title: {
        text: "Bacteria Cultures Per Sample",
        font: {
          color: 'gray' 
        }
      },
      hovermode: "closest",
      xaxis: { 
        title: "OTU ID",
        font: {
          color: 'gray' 
        }
       },
      yaxis: {
        title: {
          text: "Number of Bacteria",
          font: {
            color: 'gray' 
          }
        }
      },
      margin: { t: 30 }
    };
    
   
    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace2 = {
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    }

    let barData = [trace2];

    let barLayout = {
      
      title:{
        text:"Top 10 Bacteria Cultures Found",
        font:{
          color: 'gray'
        }
      },
      xaxis: { title: "Number of Bacteria" },
      margin: { t: 30, l: 150 }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let selectDropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++) {
      const sample = names[i];
      selectDropdown.append("option").text(sample).property("value", sample);
    }
    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
