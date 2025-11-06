// Equipment Inventory Component gemäß Masterplan

'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { EquipmentSlot } from './EquipmentSlot';
import { Button } from '@/components/ui';
import { ITEM_RARITY } from '@/lib/game/constants';

interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  itemType: string;
  rarity: string;
  baseStrength: number;
  slot: string;
  iconPath: string | null;
  requiredLevel: number;
}

interface CharacterEquipment {
  id: string;
  slot: string;
  isEquipped: boolean;
  equipment: EquipmentItem;
}

interface EquipmentInventoryProps {
  equipment: EquipmentItem[];
  characterEquipment: CharacterEquipment[];
  characterLevel: number;
  onEquip: (equipmentId: string, slot: string) => void;
  onUnequip: (slot: string) => void;
}

export const EquipmentInventory: React.FC<EquipmentInventoryProps> = ({
  equipment,
  characterEquipment,
  characterLevel,
  onEquip,
  onUnequip,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [filterRarity, setFilterRarity] = useState<string>('ALL');

  const equippedItems = characterEquipment
    .filter((ce) => ce.isEquipped)
    .reduce((acc, ce) => {
      acc[ce.slot] = ce.equipment;
      return acc;
    }, {} as Record<string, EquipmentItem>);

  const availableItems = equipment.filter((item) => {
    if (filterRarity !== 'ALL' && item.rarity !== filterRarity) return false;
    if (selectedSlot && item.slot !== selectedSlot) return false;
    return characterLevel >= item.requiredLevel;
  });

  const slots = ['HELM', 'SHOULDER', 'CHEST', 'LEGS', 'FEET', 'WEAPON', 'ACCESSORY'];

  return (
    <div className="space-y-6">
      {/* Equipped Items */}
      <Card>
        <CardHeader>
          <CardTitle>Angelegte Ausrüstung</CardTitle>
        </CardHeader>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {slots.map((slot) => {
              const equippedItem = equippedItems[slot];
              return (
                <div key={slot} className="flex flex-col items-center">
                  <EquipmentSlot
                    slot={slot as any}
                    item={equippedItem ? {
                      name: equippedItem.name,
                      rarity: equippedItem.rarity as any,
                      iconPath: equippedItem.iconPath || undefined,
                    } : undefined}
                    onClick={() => {
                      if (equippedItem) {
                        onUnequip(slot);
                      }
                    }}
                  />
                  {equippedItem && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => onUnequip(slot)}
                    >
                      Ablegen
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Equipment Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Verfügbare Ausrüstung</CardTitle>
        </CardHeader>
        <div className="p-6">
          {/* Filter */}
          <div className="mb-4 flex gap-2 flex-wrap">
            <Button
              variant={filterRarity === 'ALL' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterRarity('ALL')}
            >
              Alle
            </Button>
            {Object.keys(ITEM_RARITY).map((rarity) => (
              <Button
                key={rarity}
                variant={filterRarity === rarity ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterRarity(rarity)}
              >
                {ITEM_RARITY[rarity as keyof typeof ITEM_RARITY].name}
              </Button>
            ))}
          </div>

          {/* Slot Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              Slot
            </label>
            <select
              value={selectedSlot || 'ALL'}
              onChange={(e) => setSelectedSlot(e.target.value === 'ALL' ? null : e.target.value)}
              className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-temple-gold)] bg-white dark:bg-gray-800 text-[var(--text-primary)]"
            >
              <option value="ALL">Alle Slots</option>
              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Equipment List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableItems.map((item) => {
              const rarityColor = ITEM_RARITY[item.rarity as keyof typeof ITEM_RARITY]?.color || '#808080';
              const isEquipped = characterEquipment.some(
                (ce) => ce.equipment.id === item.id && ce.isEquipped
              );

              return (
                <div
                  key={item.id}
                  className="p-4 border-2 rounded-lg"
                  style={{
                    borderColor: rarityColor,
                    backgroundColor: isEquipped ? `${rarityColor}20` : 'transparent',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-[var(--text-primary)]" style={{ color: rarityColor }}>
                      {item.name}
                    </h3>
                    <span className="text-xs text-[var(--text-secondary)]">
                      +{item.baseStrength} Strength
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-3">
                    <span>Slot: {item.slot}</span>
                    <span>Level: {item.requiredLevel}</span>
                  </div>
                  {!isEquipped && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => onEquip(item.id, item.slot)}
                    >
                      Anlegen
                    </Button>
                  )}
                  {isEquipped && (
                    <div className="text-sm text-green-600 font-semibold text-center">
                      ✓ Angelegt
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

