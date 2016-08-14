module.exports = {
    projects: [
    {
        id: 0,
        title: "ThrowNote",
        tags: '#notes #productivity #learning',
        date: '3/12/2016',
        description: "A note-taking tool for taking short-form notes. Uses a local SQLite, a MySQL DataBase for management and persistent note storage. Uses UserCake Library for user authentication.",
        htmlDescription: "<p>A note-taking tool for taking short-form notes. Uses a local SQLite, a MySQL DataBase for management and persistent note storage. Uses UserCake Library for user authentication.</p><p><strong>Something New:</strong> Password Salted Hashing, Shared preference within android for storing user information, Backed by aRESTful API, ability to refresh feed.</p><p><strong>Known Issues:</strong> Logins take two tries, feed does notrefresh automatically always.</p><ul><li>To refresh the feed, tap the 'more' icon in the menubar and tap 'refresh'.</li><li>To enter a new note, tap the '+' at the bottom of the main list of notes. Tags are integrated now, similar to Twitter's Hashtags. Alerts will appear for the user for empty notes. </li> <li>To edit a note, tap on it in the main list of notes and tap edit.</li><li>To delete a note, tap on it in the main list of notes, and tap 'delete'. Then tap 'okay' on the alert.</li><li>To logout, tap the 'more' icon in the menubar and tap 'logout'.</li></ul>",
        imageSectionTitle: "Schema and Screenshots",
        images: ["http://jakedawkins.com/projects/notes-a4_files/jacksod.a4.InternalSchema.jpg", "http://jakedawkins.com/projects/notes-a4_files/jacksod.a4.ExternalSchema.jpg", "http://jakedawkins.com/projects/notes-a4_files/notesa4-1.png", "http://jakedawkins.com/projects/notes-a4_files/notesa4-2.png", "http://jakedawkins.com/projects/notes-a4_files/notesa4-3.png", "http://jakedawkins.com/projects/notes-a4_files/notesa4-3.png"],
        addlSectionTitle: "Acknowledgments",
        addlSectionContent: '<ul><li><a href="http://developer.android.com/training/volley/request.html#request-json">Volley HTTP Requests</a></li><li> <a href="http://stackoverflow.com/questions/2591098/how-to-parse-json-in-java">JSON Parsing</a></li><li> <a href="http://developer.android.com/guide/topics/data/data-storage.html">Android Shared Preferences</a></li><li> <a href="http://stackoverflow.com/questions/10432543/extract-hash-tag-from-string">Implicit Tagging (like Twitter hashtags)</a></li><li> <a href="http://stackoverflow.com/questions/16910344/how-to-convert-string-into-date-time-format-in-java">DateTime Parsing</a></li></ul>'
    }
    ]
};

/* PROJECT SCHEMA
{
    id: #,
    title: project name,
    description: html description. can include <strong><em> etc,
    imageSectionTitle: plaintext title of image section,
    images: ["array of urls", "url", "url"],
    sectionTitle: title for additional section below images,
    sectionContent: html content for section
}





*/
