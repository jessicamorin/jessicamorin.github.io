class TisakAMorin
{
    constructor(language)
    {
		 
	    this.language = language;
        this.addEmailAddress();
        this.displayCurrentYear();
        this.readNews();
		this.displayFabricList();
		
		window.addEventListener('scroll', this.displayImages);
        window.addEventListener('load', this.displayImages);
        window.addEventListener('resize', this.displayImages);
		

    }
    
    /**
     * Display the current year in the copyright
     * @returns void
     */
    displayCurrentYear()
    {
        let now = new Date();
        let year = now.getFullYear();
        document.querySelector('.current-year').textContent = year;
    }

    /**
     * Add an mailto address to the contact button | http://www.jottings.com/obfuscator/
     * @returns void
     */
    addEmailAddress()
    {
        let coded = "vK5M@DvnCUCPMuvK.bC";
        let key = "lDQFn10mrVdM9kwJb3TY2zyKNRPuBf8iULXG6pajAeg4tHhs5ZvIEWo7qCOcxS";
        let shift = coded.length;
        let link = "";
        let ltr;
        
        for (let i = 0; i < coded.length; i++) {
            if (key.indexOf(coded.charAt(i)) == -1) {
                ltr = coded.charAt(i)
                link += (ltr)
            } else {
                ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length
                link += (key.charAt(ltr))
            }
        }
        
        let subject;
        if (this.language == 'fr') {
           subject = 'Demande d\'information';
        }  else {
            subject = 'Information request';
        }
        
        document.querySelector('.contact-email').href = 'mailto:' + link + '?Subject=' + subject;
        document.querySelector('.contact-email').textContent = link;
        if (document.querySelector('.privacy-email')) {
            document.querySelector('.privacy-email').href = 'mailto:' + link + '?Subject=' + subject;
        }
    }
    
	displayFabricList()
	{
		let allFabric = JSON.parse(fabric);
			
		this.sortFabricByHasLimitedQuantity(allFabric);
		this.sortFabricByIsNew(allFabric);
		     
		allFabric.forEach((fabric) => {
			this.addFabric(fabric);
		});
	}
		
	sortFabricByHasLimitedQuantity(allFabric)
	{
		allFabric.sort((x, y) => {
			return (x.hasLimitedQuantity === y.hasLimitedQuantity)? 0 : x.hasLimitedQuantity? -1 : 1;
		});
	}
	
	sortFabricByIsNew(allFabric)
	{
		allFabric.sort((x, y) => {
			return (x.isNew === y.isNew)? 0 : x.isNew? -1 : 1;
		});
	}
	
	displayImages()
	{
        var elements = document.querySelectorAll("*[realsrc]");
        for (var i = 0; i < elements.length; i++) {
			var boundingClientRect = elements[i].getBoundingClientRect();
			if (elements[i].hasAttribute("realsrc") && boundingClientRect.top < window.innerHeight) {
				elements[i].setAttribute("src", elements[i].getAttribute("realsrc"));
				elements[i].removeAttribute("realsrc");
			}
        };
	}
        
	addFabric(fabric) 
	{
		 
	   // Create fabric from template
        let fabricTemplate = document.querySelector('.fabric-container-template');
        let newFabric = fabricTemplate.cloneNode(true);
        newFabric.classList.remove('fabric-container-template');

        // Add properties
		if (fabric.isNew == true) {
			newFabric.querySelector('.label-tags.is-new').classList.remove('hidden');
		}
		if (fabric.isPopular == true) {
			newFabric.querySelector('.label-tags.is-popular').classList.remove('hidden');
		}
		if (fabric.isSoldOut == true) {
			newFabric.querySelector('.label-tags.is-soldout').classList.remove('hidden');
		}
		if (fabric.hasLimitedQuantity == true) {
			newFabric.querySelector('.label-tags.has-limited-quantity').classList.remove('hidden');
		}
		
		newFabric.querySelector('.fabric-name').textContent = fabric.title;
		newFabric.querySelector('.fabric-description').textContent = fabric.description;
		
		var downloadingImage = new Image();
		downloadingImage.onload = function(){
			newFabric.querySelector('.fabric-image').src = this.src;  
		};		
		
		newFabric.querySelector('.fabric-image').setAttribute("realsrc", fabric.image);

        // Add fabric to fabric list
        document.querySelector('.fabric-listing').appendChild(newFabric);

	}
	
    /**
     * Read the json file base on the language
     * @returns {void}
     */
    readNews()
    {
        let allNews;

        if (this.language == 'fr') {
            if (typeof news =='undefined') {
                return;
            }
            allNews = JSON.parse(news);
        } else {
            if (typeof newsEn =='undefined') {
                return;
            }
            allNews = JSON.parse(newsEn);
        }

        let now = new Date();

        allNews.sort(this.compareDate);

        allNews.forEach((news) => {
            let publishDate = new Date(news.publish_date);
            let unpublishDate = new Date(news.unpublish_date);

            if (now > publishDate && now < unpublishDate) {
                let newsItem = this.addNews(news);
                if (document.querySelectorAll('.news-container .news-section').length % 2 == 1) {
                    newsItem.querySelector('.first-column').classList.add('order-lg-2');
                    newsItem.querySelector('.second-column').classList.add('order-lg-1');
                }
            }
        });
    }

    /**
     * Add news from the json to the DOM
     * @param {object} news
     * @returns {TisakAMorin.addNews.newNews}
     */
    addNews(news)
    {
        // Create news from template
        let newsTemplate = document.querySelector('.news-template');
        let newNews = newsTemplate.cloneNode(true);
        newNews.classList.remove('news-template');

        // Add properties
        this.addTitle(newNews, news.title);
        this.addDescription(newNews, news.description);
        this.addLink(newNews, news.link);
        this.addLinkText(newNews, news.link_text);
        this.addImage(newNews, news.image);

        // Add news to news list
        document.querySelector('.news-container').appendChild(newNews);

        return newNews;
    }

    /**
     * Add a title to a  news
     * @param {object} newNews
     * @param {string} title
     * @returns {void}
     */
    addTitle(newNews, title)
    {
        newNews.querySelector('.news-title').textContent = title;
    }
    
    /**
     * Add a description to a  news
     * @param {object} newNews
     * @param {string} title
     * @returns {void}
     */
    addDescription(newNews, description)
    {
        newNews.querySelector('.news-description').textContent = description;
    }    

    /**
     * Add a link to a  news
     * @param {object} newNews
     * @param {string} title
     * @returns {void}
     */
    addLink(newNews, link)
    {
        if (typeof link != 'undefined') {
            newNews.querySelector('.news-link').href = link;
        } else {
            newNews.querySelector('.news-link').classList.add('hidden');
        }
    }
    
    /**
     * Add a text link to a  news
     * @param {object} newNews
     * @param {string} title
     * @returns {void}
     */
    addLinkText(newNews, linkText)
    {
        newNews.querySelector('.news-link-text').textContent = linkText;
    }

    /**
     * Add an image to a  news
     * @param {object} newNews
     * @param {string} title
     * @returns {void}
     */
    addImage(newNews, image)
    {
        newNews.querySelector('.news-image').src = image;
    }   

    /***
     * Compare date betweenes news
     * @param {object} a
     * @param {object} b
     * @returns {Number}
     */
    compareDate(a, b) {
        return new Date(b.publish_date) - new Date(a.publish_date);
    }
}

/*
var modal = document.getElementById("myModal");
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}*/