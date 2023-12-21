
let result = '';
let searchInput = document.getElementById("searchInput").value;
const main_wrapper = document.getElementsByTagName('main')[0];

const API_KEY = 'AIzaSyCzbv0_5TvcTyy1Sr5AZ7DmHuVaZ8rDLrA'
const SEARCH_ENGINE_ID = 'a3cddc2ed7f1e41e3';

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



async function handleKeyPress(event) {


    const URL = `https://customsearch.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${searchInput}`

    searchInput = document.getElementById("searchInput").value;


    if (event.keyCode === 13 || event === 'searchBtn') {

        try {
            result = await fetchData(URL)
            localStorage.clear();
            localStorage.setItem('data', JSON.stringify(result));
            localStorage.setItem('searchInput', JSON.stringify(searchInput));
            window.location.href = `searchResultPage.html`
        } catch (error) {
            localStorage.clear();
            window.alert('oops Internal server Error')
        }



    }

}


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

        const thumbnailSrc = item?.pagemap?.cse_image?.length > 0 ? item.pagemap.cse_image[0].src : '';
        if (thumbnailSrc) {
            const thumbnailImg = document.createElement('img');
            thumbnailImg.className = "thumbnail_image";
            thumbnailImg.src = thumbnailSrc;
            thumbnailImg.alt = 'thumbnail';
            wrapperDiv.appendChild(thumbnailImg);
        }

        const displayLink = document.createElement('p');
        displayLink.className = 'display_link'
        displayLink.textContent = item?.displayLink;
        wrapperDiv.appendChild(displayLink);

        const titleLink = document.createElement('a');
        titleLink.href = item?.link;
        titleLink.className = 'title_wrapper';

        const titleHeading = document.createElement('h3');
        titleHeading.textContent = item?.title;
        titleHeading.className = 'title_heading';

        titleLink.appendChild(titleHeading);
        wrapperDiv.appendChild(titleLink);

        const snippetParagraph = document.createElement('p');
        snippetParagraph.textContent = item?.snippet;
        snippetParagraph.className = 'snippet';

        wrapperDiv.appendChild(snippetParagraph);

        result_wrapper.appendChild(wrapperDiv);

        container.appendChild(result_wrapper);

        main_wrapper.appendChild(container);
    });
}




document.addEventListener('DOMContentLoaded', () => {

    let currHtmlPage = window.location.pathname;

    if (currHtmlPage === '/index.html') {
        localStorage.clear();
    }

    result = JSON.parse(localStorage.getItem('data'));
    searchInput = JSON.parse(localStorage.getItem('searchInput'))
    document.getElementById('searchInput').value = searchInput;



    if (result) {

        displaySearchResult(result);
    }


});



