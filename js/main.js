class TisakAMorin
{
    static get NEWSCONTAINER() {
        return document.querySelector('.news-container');
    }
    static get NEWSTEMPLATE() {
        return document.querySelector('.news-template');
    }
    static get CONTACTEMAIL() {
        return document.querySelector('.contact-email');
    }
    static get CURRENTYEAR() {
        return document.querySelector('.current-year');
    }
    
    constructor(language)
    {
        this.language = language;
        this.addEmailAddress();
        this.displayCurrentYear();
        this.readNews();
    }
    
    /**
     * Display the current year in the copyright
     * @returns void
     */
    displayCurrentYear()
    {
        let now = new Date();
        let year = now.getFullYear();
        TisakAMorin.CURRENTYEAR.textContent = year;
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
        
        TisakAMorin.CONTACTEMAIL.href = 'mailto:' + link + '?Subject=' + subject;
        TisakAMorin.CONTACTEMAIL.textContent = link;
    }
    
    /**
     * Read the json file base on the language
     * @returns {void}
     */
    readNews()
    {
        let allNews;

        if (this.language == 'fr') {
            allNews = JSON.parse(news);
        } else {
            allNews = JSON.parse(newsEn);
        }

        let now = new Date();

        allNews.sort(this.compareDate);

        allNews.forEach((news) => {
            let publishDate = new Date(news.publish_date);
            let unpublishDate = new Date(news.unpublish_date);

            if (now > publishDate && now < unpublishDate) {
                let newsItem = this.addNews(news);
                if (TisakAMorin.NEWSCONTAINER.querySelectorAll('.news-section').length % 2 == 1) {
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
        let newsTemplate = TisakAMorin.NEWSTEMPLATE;
        let newNews = newsTemplate.cloneNode(true);
        newNews.classList.remove('news-template');

        // Add properties
        this.addTitle(newNews, news.title);
        this.addDescription(newNews, news.description);
        this.addLink(newNews, news.link);
        this.addLinkText(newNews, news.link_text);
        this.addImage(newNews, news.image);

        // Add news to news list
        TisakAMorin.NEWSCONTAINER.appendChild(newNews);

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