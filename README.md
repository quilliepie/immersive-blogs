# Immersive Blogs

## What is this Project?

### Origin

This is a _work-in-progress_ website, which I am creating to use as a way to share some of my personal experiences with the hopes of helping you, the reader, and others, to find peace, direction, and meaning in life.

I used to write regular blogs and share them online, but it didn't feel engaging enough. I felt that my writing alone wasn't enough to really _move_ those who read it—so, I thought about creating an _immersive_ blog website to share my blogs.

> You can find out what makes it "immersive" in the section "Features."

### Why Make This?

I've done a lot of spiritual work to connect with the person I am deep down, and I realized that my purpose in life is to use my creative abilities to spread love and empathy, and to be a light in others' lives to find peace through _presence._ I'm working a lot to maintain a living situation, and being able to work on projects like these with the time I have helps me create a fulfilling life.

While I want to do more than just create immersive blogs, this provides me with an outlet to be authentic and share my experiences in a way that is engaging, soothing, and fun.

## Features

By default, opening an immersive blog treats you with the following features:

- Voiceover
- Dynamic Music
- Dynamic Text/Dialogue
- Animated Character Portraits
- Navigation

If desired, there are options to change the settings:

1. **Disable/Enable Autoplay.** The blog will normally progress from start to finish without user input, though this can be disabled so that the user must click (or press a button) to continue after the current set of dialogue ends.
2. **Disable/Enable Immersion.**

## Mechanics

### Design & Flow

#### Blog: The User's Experience From Start to Finish

The list below shows the steps of the user's experience when listening to an immersive blog, and how it's implemented mechanically.

1. **Introduction:** On page load, there is a 3-second introduction animation where the title is shown in large text with the thumbnail. Music begins fading in at this point and reaches its fullest after the 3 seconds pass.
   - After the title and thumbnail are shown, the preview text appears below the title and thumbnail in full. The narrator begins speaking with the preview text's appearance, and this shot is held until the preview text has been finished.
2. **Blog:** After the preview text is read, all of the content on the page fades out and is replaced by the main blog UI:
   - **Mobile UI:**
     - The narrator's character art appears behind the paragraph and is unique for each paragraph (based on `data.json`). The paragraph appears as a text box below the character near the bottom of the screen.
       - If there is too much text in the paragraph, the text scrolls within the text box after a delay where the narrator reads. It stops scrolling once the end of the paragraph is reached. _This is done so the text box doesn't cover the narrator art._
     - At the top of the page, the title and current sections (based on previous _header_ elements) are displayed. This is displayed above the character art.
     - There is an icon at the top right of the screen which the user can click at any time to switch to a reading format.
   -

#### Other Design Points

To have dynamic points, each immersive blog contains the following files:

- A `.md` (markdown) file containing the writing of the blog.
  - This website automatically separates sections of dialogue by checking the headers and text.
- ...

### Tools Used

#### NPM Packages

Below is a list of packages I've used to help me with this project, and what they do.

- [showdown](https://github.com/showdownjs/showdown)
  - This is a simple markdown to HTML converter.
  - I use it in this project with the utility file `parseMarkdown.ts` to take the content from the `.md` files for each blog and convert them into HTML, which, when converted, is just a very long string.
    - `parseMarkdown.ts` exports a function which creates an instance of `showdown.Converter` which also interprets tables, strikethroughs and emoji. I provide the markdown file as an argument and just return the HTML as a string.
    - I then use `cheerio` (more on that below) to grab specific parts of the blog to help with rendering previews and separating content for animations and such.
- [cheerio](https://www.npmjs.com/package/cheerio)

#### Built-in Tools (such as `fs` and `path`)

To help with understanding how this project was made, I'll go over how `fs` and `path` are used throughout the project.

1. `fs` refers to Node.js' "[File System Module](https://www.w3schools.com/nodejs/nodejs_filesystem.asp)." In this project, it's primarily used for obtaining the directory of required files and reading those files.
2. `path`
