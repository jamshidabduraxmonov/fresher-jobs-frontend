const FormatPostedDate = (value: string | null): string => {
    if(!value) {
        return "Posting date not provided";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Posting date not available";
    }

    return `Posted at ${date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dubai",
    })}`;
};

export default FormatPostedDate;