import Link from 'next/link';
import Image from 'next/image';

const MenuItem = ({ href, title, target, rel, iconSrc, alt, text }) => {
  return (
    <Link
      href={href}
      title={title}
      target={target}
      rel={rel}
      className="flex items-center mx-2 my-1 p-2 !important rounded-lg flex-wrap gap-2 w-[150px] hover:bg-indigo-600"
    >
      <Image
        src={iconSrc}
        alt={alt}
        width={24}
        height={24}
        className="back-menu-item-icon entered loading"
      />
      <span className="back-menu-item-text">{text}</span>
    </Link>
  );
};

export default MenuItem;