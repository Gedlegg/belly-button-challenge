# Belly Button Biodiversity Dashboard

## Overview

This project involves creating an interactive dashboard to explore the Belly Button Biodiversity dataset. This dataset catalogs the microbes that colonize human navels, revealing that a small number of microbial species (or operational taxonomic units, OTUs) are present in more than 70% of people, while the rest are relatively rare.

## Outline

* **Table of Contents**

  * Title
  * overview
  * How it works

## How it works

The dashboard includes visualizations such as bar charts and bubble charts, as well as metadata displays, which are all dynamically updated based on user input. Below is an explanation of the key components and their functionality:

#### 1. Data Handling

* **Data Source** : The application uses the D3 library to fetch data from a remote JSON file located at `https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json`.

* **JSON Structure** : The JSON file contains sample data, including microbial species (OTUs), sample values, OTU IDs, and labels, as well as demographic information for each sample.

#### 2. Bar Chart

* **Visualization** : A horizontal bar chart displays the top 10 OTUs found in an individual.
* **Values** : The `sample_values` are used as the values for the bar chart.
* **Labels** : The `otu_ids` are used as the labels.
* **Hovertext** : The `otu_labels` are used as the hovertext to provide additional information.

#### 3. Bubble Chart

* **Visualization** : A bubble chart shows each OTU sample.
* **X Values** : The `otu_ids` are used for the x-axis.
* **Y Values** : The `sample_values` are used for the y-axis.
* **Marker Size** : The `sample_values` determine the size of the markers.
* **Marker Colors** : The `otu_ids` determine the colors of the markers.
* **Text Values** : The `otu_labels` are used for the text displayed on hover.

#### 4. Metadata Display

* **Demographic Information** : The dashboard displays metadata for the selected sample, such as age, gender, and location.
* **Dynamic Update** : When a new sample is selected, the metadata panel updates to show the relevant information for that sample.

#### 5. User Interaction

* **Dropdown Menu** : A dropdown menu allows users to select a sample. When a sample is selected, the bar chart, bubble chart, and metadata panel update to reflect the new data.
