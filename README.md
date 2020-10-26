## Coding Challenge:

The National Center for Biotechnology Information (NCBI) manages a database recognized as
the authority of all known molecular DNA sequences. As of now, this important NCBI data is
only accessible via downloadable files, so let’s create a state of the art UI to visualize the DNA
sequence data.
Please create two UI views with the following guidelines:
- Use a modern Javascript framework of your choice
- Make the source code available to us and a way to view your amazing work in action.
Assignment:

1. We need an unprecedented and delightful UI that enables scientists to upload, visualize, and
validate DNA sequences. The sequences available in this JSON file are an example of cloning
vectors from the NCBI which are critical for next generation sequencing and DNA transformation
lab techniques.

2. We want to first create an “Add DNA Sequence” view. This view is a simple form that allows a
user to enter a single sequence name, sequence description, and DNA sequence that contains
the four DNA letters. For this assignment it is acceptable to store all sequence data with some
in-memory or browser storage. 

## Requirments:

- The data should be validated: the sequence should only contain valid characters and should not already exist in our sequence storage. If validation fails, do not add the sequence and display the validation error in the form.

- The “Sequences” view should display all added DNA sequences, showing the name, description and truncated DNA sequence. It should have the following features:

- The view should be sortable by name

- A search bar should filter the elements in the view on sequence names that match the
search term

- If one clicks on a sequence, a simple modal should come up that displays the full DNA
sequence. Each character in the DNA sequence should be a different color.

- Bonus features: Add json import and export in the Sequences view. Exporting will give
the user a json file of the stored sequences in the table. Importing allows a user to take a
json file of DNA sequences and updates the table.

## How to view the project

- The project is built using React
- No configuration nencessary
- download the app

`cd ginkodna`

`npm start`

 - Open http://localhost:3000 to view it in the browser.