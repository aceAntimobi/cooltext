import { useEffect, useState } from 'react';
import type { Item } from '../data/library';

interface ItemCardProps {
  item: Item;
  categoryLabel: string;
  isFavorite: boolean;
  onToggleFavorite: (item: Item) => void;
  onCopy: (item: Item) => Promise<void>;
  onOpenDetail: (item: Item) => void;
}

export function ItemCard({ item, categoryLabel, isFavorite, onToggleFavorite, onCopy, onOpenDetail }: ItemCardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    if (copied) {
      timer = window.setTimeout(() => setCopied(false), 1500);
    }
    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [copied]);

  const handleCopy = async () => {
    await onCopy(item);
    setCopied(true);
  };

  return (
    <article className="item-card" aria-label={`${item.name} ${item.character}`}>
      <div className="item-character" aria-hidden>{item.character}</div>
      <h3 className="item-name">{item.name}</h3>
      <div className="item-meta">{categoryLabel}</div>
      {item.keywords.length > 0 && (
        <div className="token-strip" aria-label="Keywords">
          {item.keywords.slice(0, 4).map((keyword) => (
            <span className="token" key={keyword}>
              #{keyword}
            </span>
          ))}
        </div>
      )}
      <div className="item-actions">
        <button type="button" className="action-button" onClick={handleCopy}>
          <span role="img" aria-hidden>
            📋
          </span>
          Copy
        </button>
        <button type="button" className="action-button secondary" onClick={() => onOpenDetail(item)}>
          Details
        </button>
        <button
          type="button"
          className="favorite-toggle"
          onClick={() => onToggleFavorite(item)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      {copied && <div className="copy-feedback">Copied!</div>}
    </article>
  );
}
