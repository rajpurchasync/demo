import React from 'react';
import { cn } from '../../utils/cn';

interface Tile {
  label: string;
  value: string;
  description?: string;
}

interface TileGridProps {
  tiles: Tile[];
  selected: string;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4;
}

export function TileGrid({ tiles, selected, onChange, columns = 2 }: TileGridProps) {
  return (
    <div className={cn(
      'grid gap-3',
      {
        'grid-cols-2': columns === 2,
        'grid-cols-3': columns === 3,
        'grid-cols-4': columns === 4,
      }
    )}>
      {tiles.map((tile) => (
        <button
          key={tile.value}
          type="button"
          onClick={() => onChange(tile.value)}
          className={cn(
            'p-4 rounded-lg border-2 text-left transition-all duration-200 active:scale-95',
            selected === tile.value
              ? 'border-[#145434] bg-green-50 text-[#145434]'
              : 'border-gray-200 hover:border-gray-300 text-gray-700'
          )}
        >
          <div className="font-semibold">{tile.label}</div>
          {tile.description && (
            <div className="text-sm opacity-75 mt-1">{tile.description}</div>
          )}
        </button>
      ))}
    </div>
  );
}