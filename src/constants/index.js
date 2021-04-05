export const commonTippyConfig = {
	theme: "warn",
	allowHTML: true,
};

export const categories = [
	"Software Development",
	"Game Development",
	"Quality Assurance",
	"Customer Support",
	"Sales",
	"Marketing",
	"Design",
	"Legal",
];

export const types = [
	{ text: "Full Time", value: "FullTime" },
	{ text: "Part Time", value: "PartTime" },
	{ text: "Contract", value: "Contract" },
	{ text: "Temporary", value: "Temporary" },
	{ text: "Volunteer", value: "Volunteer" },
	{ text: "Internship", value: "Internship" },
	{ text: "Other", value: "Other" },
];

export const flairs = [
	{ text: "$20 - Urgent", value: "Urgent" },
	{ text: "$30 - Exclusive", value: "Exclusive" },
	{ text: "$40 - Promoted", value: "Promoted" },
	{ text: "$50 - Sponsored", value: "Sponsored" },
	{ text: "$60 - Hot", value: "Hot" },
	{ text: "$80 - Popular", value: "Popular" },
	{ text: "$90 - Featured", value: "Featured" },
];

export const status = {
	Active: "Active",
	Inactive: "	Inactive",
	Deleted: "	Deleted",
};

export const markdownExample = `
# h1 Headings 🌎
---  
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading  


## Horizontal Rules

___

---

***


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+ \`, \` - \`, or \` * \`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

JavaScript

\`\`\`
var foo = function (bar) {
	return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
`;
