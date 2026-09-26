export const updatePageMeta = (
    title: string,
    description: string
) => {
    document.title = title;

    let metaDescription = document.querySelector(
        'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if(!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }

    metaDescription.content = description;
};