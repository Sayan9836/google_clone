
// Initialize variables

let result = '';
let searchInput = document.getElementById("searchInput").value;
const main_wrapper = document.getElementsByTagName('main')[0];

// Google Custom Search API credentials

const API_KEY = 'AIzaSyCzbv0_5TvcTyy1Sr5AZ7DmHuVaZ8rDLrA'
const SEARCH_ENGINE_ID = 'a3cddc2ed7f1e41e3';

// Function to fetch data from Google Custom Search API

const fetchData = async (URL) => {

    try {

        let data = await fetch(URL);
        data = await data.json();

    } catch (error) {
        window.alert('oops error while processing')
        console.log("hello");
    }

    return data;


}


// Event handler for key press (Enter) or search button click

async function handleKeyPress(event) {


    const URL = `https://customsearch.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${searchInput}`

    searchInput = document.getElementById("searchInput").value;


    if (event.keyCode === 13 || event === 'searchBtn') {

        try {

            result = await fetchData(URL)

            // add data to the local storage
            localStorage.setItem('data', JSON.stringify(result));
            localStorage.setItem('searchInput', JSON.stringify(searchInput));

            // redirecting to the searchResultPage
            window.location.href = `searchResultPage.html`

        } catch (error) {

            localStorage.clear();

            // showing alert on failed request
            window.alert('oops Internal server Error')

        }



    }

}


// Function to display search results on the page

const displaySearchResult = (result) => {


    const container = document.createElement('div');
    container.className = 'container';

    const about = document.createElement('p');
    about.className = 'about';

    about.textContent = `About ${result?.searchInformation?.formattedTotalResults} results${" "}
    ${result?.searchInformation?.searchTime} seconds`

    container.appendChild(about);

    const result_wrapper = document.createElement('div');
    result_wrapper.className = 'list_wrapper'

    result?.items?.forEach(item => {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'wrapper'

        // Create and append thumbnail image if available
        const thumbnailSrc = item?.pagemap?.cse_image?.length > 0 ? item.pagemap.cse_image[0].src : '';
        if (thumbnailSrc) {
            const thumbnailImg = document.createElement('img');
            thumbnailImg.className = "thumbnail_image";
            thumbnailImg.src = thumbnailSrc;
            thumbnailImg.alt = 'thumbnail';
            wrapperDiv.appendChild(thumbnailImg);
        }


        // Create and append display link
        const displayLink = document.createElement('p');
        displayLink.className = 'display_link'
        displayLink.textContent = item?.displayLink;
        wrapperDiv.appendChild(displayLink);


        // Create and append title link
        const titleLink = document.createElement('a');
        titleLink.href = item?.link;
        titleLink.className = 'title_wrapper';

        const titleHeading = document.createElement('h3');
        titleHeading.textContent = item?.title;
        titleHeading.className = 'title_heading';

        titleLink.appendChild(titleHeading);
        wrapperDiv.appendChild(titleLink);


        // Create and append snippet paragraph
        const snippetParagraph = document.createElement('p');
        snippetParagraph.textContent = item?.snippet;
        snippetParagraph.className = 'snippet';

        wrapperDiv.appendChild(snippetParagraph);

        result_wrapper.appendChild(wrapperDiv);

        container.appendChild(result_wrapper);

        main_wrapper.appendChild(container);
    });
}



// Event listener when DOM content is loaded or page is changed
document.addEventListener('DOMContentLoaded', () => {

    let currHtmlPage = window.location.pathname;

    if (currHtmlPage === '/index.html') {

        // Clear local storage on index.html page load
        localStorage.clear();

    }

    // Retrieve data from local storage and display search result if available
    result = JSON.parse(localStorage.getItem('data'));
    searchInput = JSON.parse(localStorage.getItem('searchInput'))
    document.getElementById('searchInput').value = searchInput;



    if (result) {

        displaySearchResult(result);
    }


});



