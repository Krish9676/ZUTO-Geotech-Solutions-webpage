const links = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'Docs', href: '#api-docs' },
  { name: 'GitHub', href: 'https://github.com/', external: true },
  { name: 'Contact', href: '#contact' },
];
const socials = [
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
  ) },
  { name: 'Twitter', href: 'https://twitter.com', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636a9.936 9.936 0 0 0 2.457-2.548z"/></svg>
  ) },
];

const Footer = () => (
  <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-8">
    <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex gap-6 mb-2 md:mb-0">
        {links.map(link => link.external ? (
          <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">{link.name}</a>
        ) : (
          <a key={link.name} href={link.href} className="hover:text-green-600 transition">{link.name}</a>
        ))}
      </div>
      <div className="flex gap-3">
        {socials.map(s => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-green-600">{s.icon}</a>
        ))}
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
      &copy; {new Date().getFullYear()} ToviAgriTech. All rights reserved. <a href="#" className="underline ml-2">Privacy Policy</a>
    </div>
  </footer>
);

export default Footer;