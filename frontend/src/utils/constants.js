export const richTextStyles = {
  paragraph: ({ children }) => (
    <p className="text-left text-gray-600 mb-4">{children}</p>
  ),
  heading: ({ children, level }) => {
    const Tag = `h${level}`;
    const classes = {
      1: "text-3xl font-bold mb-4",
      2: "text-2xl font-bold mb-3",
      3: "text-xl font-semibold mb-2 text-gray-800",
      4: "text-lg font-semibold mb-2 text-gray-800",
    };
    return <Tag className={classes[level] || classes[4]}>{children}</Tag>;
  },
  link: ({ children, url }) => (
    <a
      href={url}
      className="text-secondary hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  list: ({ children, format }) => {
    const Tag = format === "ordered" ? "ol" : "ul";
    const className =
      format === "ordered"
        ? "list-decimal list-inside mb-4"
        : "list-disc list-inside mb-4";
    return <Tag className={`${className} text-left`}>{children}</Tag>;
  },
  "list-item": ({ children }) => <li className="mb-1">{children}</li>,
  quote: ({ children }) => (
    <blockquote className="border-l-4 border-secondary pl-4 italic my-4">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
      <code>{children}</code>
    </pre>
  ),
};

export const apiURL =
  process.env.REACT_APP_API_PATH ||
  "https://funny-power-054eb40c79.strapiapp.com";
