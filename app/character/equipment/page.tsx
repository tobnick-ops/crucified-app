// Equipment Page gemäß Masterplan

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { EquipmentInventory } from '@/components/equipment/EquipmentInventory';

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

export default function EquipmentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [characterEquipment, setCharacterEquipment] = useState<CharacterEquipment[]>([]);
  const [characterLevel, setCharacterLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      loadEquipment();
    }
  }, [status, router]);

  const loadEquipment = async () => {
    try {
      const [equipmentResponse, characterEquipmentResponse, statsResponse] = await Promise.all([
        fetch('/api/equipment'),
        fetch('/api/character/equipment'),
        fetch('/api/character/stats'),
      ]);

      const equipmentData = await equipmentResponse.json();
      const characterEquipmentData = await characterEquipmentResponse.json();
      const statsData = await statsResponse.json();

      if (!equipmentResponse.ok) {
        setError(equipmentData.error || 'Fehler beim Laden der Ausrüstung');
      } else if (!characterEquipmentResponse.ok) {
        setError(characterEquipmentData.error || 'Fehler beim Laden der Charakter-Ausrüstung');
      } else {
        setEquipment(equipmentData.equipment || []);
        setCharacterEquipment(characterEquipmentData.equipment || []);
        // TODO: Character Level aus stats laden
        setCharacterLevel(statsData.level || 1);
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const handleEquip = async (equipmentId: string, slot: string) => {
    try {
      const response = await fetch('/api/character/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ equipmentId, slot, action: 'equip' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Fehler beim Anlegen');
      } else {
        setError('');
        // Reload equipment
        await loadEquipment();
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    }
  };

  const handleUnequip = async (slot: string) => {
    try {
      const response = await fetch('/api/character/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slot, action: 'unequip' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Fehler beim Ablegen');
      } else {
        setError('');
        // Reload equipment
        await loadEquipment();
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-temple-gold)] mx-auto"></div>
          <p className="mt-4 text-[var(--text-secondary)]">Lädt...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-temple-blue-dark)] to-[var(--color-temple-blue)] p-4">
      <div className="max-w-6xl mx-auto mt-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <EquipmentInventory
          equipment={equipment}
          characterEquipment={characterEquipment}
          characterLevel={characterLevel}
          onEquip={handleEquip}
          onUnequip={handleUnequip}
        />
      </div>
    </div>
  );
}

