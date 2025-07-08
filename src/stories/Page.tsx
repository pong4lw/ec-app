import Link from "next/link";

// 1. Atoms
const Link = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const TipIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path
        d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
        fill="#999"
      />
    </g>
  </svg>
);

// 2. Molecules
const Tip = () => (
  <div className="tip-wrapper">
    <span className="tip">Tip</span> Adjust the width of the canvas with the{" "}
    <TipIcon /> Viewports addon in the toolbar
  </div>
);

const ParagraphWithLink = ({ textBefore, linkHref, linkText, textAfter }) => (
  <p>
    {textBefore}{" "}
    <Link href={linkHref}>
      <strong>{linkText}</strong>
    </Link>{" "}
    {textAfter}
  </p>
);

// 3. Organisms
const StorybookPageContent = () => (
  <section className="storybook-page">
    <h2>Pages in Storybook</h2>
    <ParagraphWithLink
      textBefore="We recommend building UIs with a"
      linkHref="https://componentdriven.org"
      linkText="component-driven"
      textAfter="process starting with atomic components and ending with pages."
    />
    <p>
      Render pages with mock data. This makes it easy to build and review page
      states without needing to navigate to them in your app. Here are some
      handy patterns for managing page data in Storybook:
    </p>
    <ul>
      <li>
        Use a higher-level connected component. Storybook helps you compose such
        data from the &quot;args&quot; of child component stories
      </li>
      <li>
        Assemble data in the page component from your services. You can mock
        these services out using Storybook.
      </li>
    </ul>
    <p>
      Get a guided tutorial on component-driven development at{" "}
      <Link href="https://storybook.js.org/tutorials/">
        Storybook tutorials
      </Link>
      . Read more in the <Link href="https://storybook.js.org/docs">docs</Link>.
    </p>
    <Tip />
  </section>
);

// 4. Template or Page
const Page = ({ user, setUser }) => (
  <article>
    <Header
      user={user}
      onLogin={() => setUser({ name: "Jane Doe" })}
      onLogout={() => setUser(undefined)}
      onCreateAccount={() => setUser({ name: "Jane Doe" })}
    />
    <StorybookPageContent />
  </article>
);
