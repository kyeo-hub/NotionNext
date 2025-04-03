// components/FooterGroup.js
import Link from 'next/link';

const FooterGroup = ({ title, links }) => {
  return (
    <div className="flex-1 min-w-[200px] m-4 max-w-24">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex flex-col space-y-1 ">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            title={link.title}
            target={link.target}
            rel={link.rel}
          >
            <span className="px-[8px] py-[2px] rounded-md text-black hover:text-indigo-600 hover:bg-indigo-100">{link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterGroup;