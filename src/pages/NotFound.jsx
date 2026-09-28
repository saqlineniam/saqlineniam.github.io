import { Link } from 'react-router-dom';
import useTitle from '../lib/useTitle';

const NotFound = ({ what = 'page' }) => {
  useTitle('Not found');
  return (
    <div className="max-w-xl mx-auto px-5 py-28 text-center">
      <p className="accent text-8xl md:text-9xl leading-none mb-6">404</p>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4">This {what} doesn’t exist</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">
        It may have moved. Try the search (<kbd className="font-mono text-sm">Ctrl K</kbd>) or head back.
      </p>
      <div className="flex justify-center gap-3">
        <Link to="/" className="btn btn-primary">Home</Link>
        <Link to="/projects" className="btn btn-ghost">Projects</Link>
      </div>
    </div>
  );
};

export default NotFound;
