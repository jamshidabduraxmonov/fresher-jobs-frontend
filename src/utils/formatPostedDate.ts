const FormatPostedDate = (value: string | null): string => {
    if(!value) {
        return "Posting date not provided";
    }


    function getDubaiDateParts(date: Date) {
        const formatter = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Dubai",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        return formatter.format(date);
    }


    function isTodayOrYesterday(dateString: string){
        const date = new Date(dateString);

        const today = new Date();
        const yesterday = new Date();

        yesterday.setDate(today.getDate() -1 );

        const dateDay = getDubaiDateParts(date);
        const todayDay = getDubaiDateParts(today);
        const yesterdayDay = getDubaiDateParts(yesterday);

        if(dateDay === todayDay){
            return "today";
        }

        if(dateDay === yesterdayDay){
            return "yesterday";
        }

        return undefined;

        
    }


    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Posting date not available";
    }

    if(isTodayOrYesterday(value) === "today"){
        return `Posted Today`;
    }else if(isTodayOrYesterday(value) === "yesterday"){
        return `Posted Yesterday`;
    }else{
        return `Posted on ${date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Dubai",
        })}`;
    }

  
};

export default FormatPostedDate;