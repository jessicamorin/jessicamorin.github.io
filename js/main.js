class TisakAMorin
{    
    static get NEWSCONTAINER() {
        return document.querySelector('.news-container');
    }
    static get NEWSTEMPLATE() {
        return document.querySelector('.news-template');
    }
    
    constructor(language)
    {
        this.language = language;
        this.readNews();
    }
    
    readNews()
    {
        let allNews;
        
        if (this.language == 'fr') {
            allNews = JSON.parse(news);
        } else {
            allNews = JSON.parse(newsEn);
        }
       
        let now = new Date();

        console.log(now);  
        
        allNews.sort(this.compareDate);

        allNews.forEach((news) => {
           let publishDate = new Date(news.publish_date);
           let unpublishDate = new Date(news.unpublish_date);
           
           if (now > publishDate && now < unpublishDate) {
               console.log('add news');
               let newsItem = this.addNews(news);
               if (TisakAMorin.NEWSCONTAINER.querySelectorAll('.news-section').length % 2 == 1) {
                   newsItem.querySelector('.first-column').classList.add('order-lg-2');
                   newsItem.querySelector('.second-column').classList.add('order-lg-1');
               }
           }
        });
    }
    
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
    
    addTitle(newNews, title)
    {
        newNews.querySelector('.news-title').textContent = title;
    }
    
    addDescription(newNews, description)
    {
        newNews.querySelector('.news-description').textContent = description;
    }    
   
    addLink(newNews, link)
    {        
        if (typeof link != 'undefined') {
            newNews.querySelector('.news-link').href = link;
        } else {
            newNews.querySelector('.news-link').classList.add('hidden');
        }
    }
    
    addLinkText(newNews, linkText)
    {        
        newNews.querySelector('.news-link-text').textContent = linkText;
    }
      
    addImage(newNews, image)
    {        
        newNews.querySelector('.news-image').src = image;
    }   
    
    formatDate(date, format) {
        var monthNames = [
          "Janvier", "Février", "Mars",
          "Avril", "Mai", "Juin", "Juillet",
          "Août", "Septembre", "Octobre",
          "Novembre", "Décembre"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
    
    compareDate(a, b) {
        return new Date(b.publish_date) - new Date(a.publish_date);
    }
}
