export interface InlineImage {
    link: string;
    original: string;
    source: string;
    source_name: string;
    thumbnail: string;
    title: string;
}

export interface inlineImagesSuggestedSearche {
    chips: string;
    link: string;
    name: string;
    serpapi_link: string;
    thumbnail: string;
}



export interface GPS {
    altitude: number;
    latitude: number;
    longitude: number;
}

export interface LocalMap {
    gps_coordinates: GPS;
    link: string;
    image: string;
}

export interface Place {
    address: string;
    description: string;
    lsig: string;
    place_id: string;
    place_id_search: string;
    position: number;
    rating: number;
    reviews: number;
    reviews_original: string;
    thumbnail: string;
    title: string;
    type: string;
}

export interface LocalResults {
    places: Place[];
}

export interface KeyMoment {
    link: string;
    time: string;
    thumbnail: string;
    title: string;
}

export interface InlineVideo {
    channel: string;
    date: string;
    key_moments: KeyMoment[];
    duration: string;
    link: string;
    platform: string;
    position: number;
    thumbnail: string;
    title: string;
}

export interface KnowledgeGraph {
    description: string;
    kgmid: string;
    knowledge_graph_search_link: string;
    serpapi_knowledge_graph_search_link: string;
    title: number;
    type: string;
    tabs: {
        link: string;
        serpapi_link: string;
        text: string;
    }[];
    source: {
        link: string;
        name: string;
    };
    people_also_search_for: {
        name: string;
        link: string;
        image: string;
        serpapi_link: string;
    }[];
    mapreduce_book: {
        name: string;
        link: string;
        image: string;
        serpapi_link: string;
    }[];
    header_images: {
        image: string;
        source: string;
    }[]
}

export interface OrganicResult {
    date: string;
    displayed_link: string;
    favicon: string;
    link: string;
    position: number;
    redirect_link: string;
    snippet: string;
    source: string;
    thumbnail: string;
    title: string;
    snippet_highlighted_words: string[];
    sitelinks: {
        inline: {
            link: string;
            title: string;
        }
    }
}

export interface RelatedQuestion {
    date: string;
    displayed_link: string;
    link: string;
    next_page_token: string;
    question: string;
    serpapi_link: string;
    snippet: string;
    source_logo: string;
    thumbnail: string;
    title: string;
}

export interface RelatedSearch {
    block_position: number;
    link: string;
    query: string;
    serpapi_link: string;
}

export interface SearchInformation {
    organic_results_state: string;
    query_displayed: string;
    time_taken_displayed: number;
    total_results: number;
}

export interface SearchMetadata {
    created_at: string;
    google_url: string;
    id: string;
    json_endpoint: string;
    processed_at: string;
    raw_html_file: string;
    status: string;
    total_time_taken: number;
}

export interface SearchParameters {
    device: string;
    engine: string;
    google_domain: string;
    q: string;
}

export interface Pagination {
    current: number;
    next: string;
    other_pages: any;
}

export interface SerpAPIPagination {
    current: number;
    next: string;
    next_link: string;
    other_pages: any;
}

export interface TextAds {
    inline_images: InlineImage[];
    inline_images_suggested_searches: inlineImagesSuggestedSearche[];
    inline_videos: InlineVideo[];
    local_map: LocalMap;
    local_results: LocalResults;
    knowledge_graph: KnowledgeGraph;
    organic_results: OrganicResult[];
    pagination: Pagination;
    related_questions: RelatedQuestion[];
    related_searches: RelatedSearch[];
    search_information: SearchInformation;
    search_metadata: SearchMetadata;
    search_parameters: SearchParameters;
    serpapi_pagination: SerpAPIPagination;
}