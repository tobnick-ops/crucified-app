// Phaser Game Component gemäß Masterplan

'use client';

import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

interface PhaserGameProps {
  missionId: string;
  missionData: {
    id: string;
    title: string;
    missionType: string;
    objectives: Array<{
      id: string;
      objectiveText: string;
      objectiveType: string;
      requiredValue: number;
    }>;
  };
  characterEquipment?: any;
  onObjectiveComplete?: (objectiveId: string, value: number) => void;
  onMissionComplete?: () => void;
}

export const PhaserGame: React.FC<PhaserGameProps> = ({
  missionId,
  missionData,
  characterEquipment,
  onObjectiveComplete,
  onMissionComplete,
}) => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Phaser Game Configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1024,
      height: 768,
      parent: containerRef.current,
      backgroundColor: '#2c3e50',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: function(this: Phaser.Scene) {
          // Load character sprite (placeholder)
          this.load.image('character', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNEMEFGMzciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPgo8cGF0aCBkPSJNOCAxMkwxNiA4TDI0IDEyVjIwTDE2IDI0TDggMjBWMTJaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo8L3N2Zz4K');
          // Load tilemap placeholder
          this.load.image('tile', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzQ0OTUxIi8+CjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjMkMzRTVBIi8+Cjwvc3ZnPgo=');
          // Load collectible item
          this.load.image('item', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTIiIGZpbGw9IiNGRkQ3MDAiLz4KPC9zdmc+');
          // Load NPC
          this.load.image('npc', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM5QjU5RkYiLz4KPC9zdmc+');
        },
        create: function(this: Phaser.Scene) {
          // Create tilemap background
          const tileWidth = 64;
          const tileHeight = 64;
          const mapWidth = Math.ceil(this.scale.width / tileWidth);
          const mapHeight = Math.ceil(this.scale.height / tileHeight);

          for (let x = 0; x < mapWidth; x++) {
            for (let y = 0; y < mapHeight; y++) {
              this.add.image(x * tileWidth + tileWidth / 2, y * tileHeight + tileHeight / 2, 'tile');
            }
          }

          // Create character
          const character = this.physics.add.sprite(512, 384, 'character');
          character.setCollideWorldBounds(true);
          character.setScale(1.5);

          // Character movement
          const cursors = this.input.keyboard?.createCursorKeys();
          const wasdKeys = this.input.keyboard?.addKeys('W,S,A,D') as Record<string, Phaser.Input.Keyboard.Key> | undefined;
          const wasd = wasdKeys ? {
            W: wasdKeys['W'],
            S: wasdKeys['S'],
            A: wasdKeys['A'],
            D: wasdKeys['D'],
          } : undefined;

          let characterSpeed = 200;

          // Check for movement speed boots
          if (characterEquipment) {
            const boots = characterEquipment.find((eq: any) => 
              eq.slot === 'FEET' && eq.isEquipped && eq.equipment.name.includes('Bereitschaft')
            );
            if (boots) {
              characterSpeed = 240; // 20% faster
            }
          }

          // Mission objectives tracking
          const objectives = missionData.objectives || [];
          const objectiveProgress: Record<string, number> = {};

          // Handle all objectives regardless of mission type
          // Spawn collectible items
          objectives.forEach((obj, index) => {
            if (obj.objectiveType === 'collect') {
              const itemCount = obj.requiredValue;
              for (let i = 0; i < itemCount; i++) {
                const x = Phaser.Math.Between(100, this.scale.width - 100);
                const y = Phaser.Math.Between(100, this.scale.height - 100);
                const item = this.physics.add.sprite(x, y, 'item');
                item.setScale(0.8);
                item.setData('objectiveId', obj.id);
                item.setData('value', 1);

                // Collect item on overlap
                this.physics.add.overlap(character, item, () => {
                  if (!item.active) return;
                  
                  const objectiveId = item.getData('objectiveId');
                  const value = item.getData('value');
                  
                  objectiveProgress[objectiveId] = (objectiveProgress[objectiveId] || 0) + value;
                  
                  // Update objective
                  if (onObjectiveComplete) {
                    onObjectiveComplete(objectiveId, objectiveProgress[objectiveId]);
                  }
                  
                  item.destroy();
                });
              }
            } else if (obj.objectiveType === 'interact') {
              // Spawn NPCs for interaction - GANZ DEUTLICH SICHTBAR!
              // NPC steht direkt LINKS neben dem Character (sichtbar beim Start!)
              const x = 350; // Direkt links vom Character (512 - 162 = 350)
              const y = 384; // Gleiche Höhe wie Character
              const npc = this.physics.add.sprite(x, y, 'npc');
              npc.setScale(3.0); // NOCH GRÖSSER = UNMÖGLICH ZU ÜBERSEHEN!
              npc.setData('objectiveId', obj.id);
              npc.setData('interacted', false);

              // Dynamischer NPC-Name aus Objective-Daten (z.B. "Noah", "Mose", etc.)
              const npcName = obj.targetNpc || obj.description?.split(' ')[0] || 'NPC';
              
              // Großer Hinweis-Text über dem NPC
              const interactionText = this.add.text(x, y - 50, `${npcName}\nE drücken`, {
                fontSize: '16px',
                color: '#ffffff',
                backgroundColor: '#9B59BF',
                padding: { x: 8, y: 4 },
              });
              interactionText.setOrigin(0.5);
              interactionText.setVisible(true); // IMMER SICHTBAR!

              // Zeige "E drücken" wenn nah genug
              const promptText = this.add.text(x, y + 50, 'E drücken', {
                fontSize: '14px',
                color: '#FFD700',
                backgroundColor: '#000000',
                padding: { x: 6, y: 3 },
              });
              promptText.setOrigin(0.5);
              promptText.setVisible(false);

              // Show interaction prompt on overlap
              this.physics.add.overlap(character, npc, () => {
                if (!promptText.visible) {
                  promptText.setVisible(true);
                }
              }, () => {
                // Wenn zu weit weg
                promptText.setVisible(false);
              });

              // Handle interaction (einmalig für alle E-Key Events)
              let eKeyHandler: Phaser.Input.Keyboard.Key | null = null;
              if (!eKeyHandler) {
                eKeyHandler = this.input.keyboard?.addKey('E') || null;
                eKeyHandler?.on('down', () => {
                  const distance = Phaser.Math.Distance.Between(
                    character.x, character.y,
                    npc.x, npc.y
                  );
                  
                  if (distance < 80 && !npc.getData('interacted')) {
                    npc.setData('interacted', true);
                    interactionText.setVisible(false);
                    promptText.setVisible(false);
                    
                    // Erfolgs-Text
                    const successText = this.add.text(x, y - 80, '✓ Erfolg!', {
                      fontSize: '18px',
                      color: '#00FF00',
                      backgroundColor: '#000000',
                      padding: { x: 8, y: 4 },
                    });
                    successText.setOrigin(0.5);
                    
                    const objectiveId = npc.getData('objectiveId');
                    objectiveProgress[objectiveId] = 1;
                    
                    if (onObjectiveComplete) {
                      onObjectiveComplete(objectiveId, 1);
                    }
                    
                    // Entferne Erfolgs-Text nach 2 Sekunden
                    this.time.delayedCall(2000, () => {
                      successText.destroy();
                    });
                  }
                });
              }
            }
          });

          // Update function for character movement
          this.update = function() {
            let velocityX = 0;
            let velocityY = 0;

            if (cursors?.left.isDown || wasd?.A?.isDown) {
              velocityX = -characterSpeed;
            } else if (cursors?.right.isDown || wasd?.D?.isDown) {
              velocityX = characterSpeed;
            }

            if (cursors?.up.isDown || wasd?.W?.isDown) {
              velocityY = -characterSpeed;
            } else if (cursors?.down.isDown || wasd?.S?.isDown) {
              velocityY = characterSpeed;
            }

            character.setVelocity(velocityX, velocityY);

            // Animate character
            if (velocityX !== 0 || velocityY !== 0) {
              // Walking animation would go here
            } else {
              // Idle animation would go here
            }
          };

          // UI: Objectives Display
          const objectivesText = this.add.text(10, 10, 'Objectives:', {
            fontSize: '16px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 },
          });

          const updateObjectivesDisplay = () => {
            let objectivesString = 'Objectives:\n';
            objectives.forEach((obj) => {
              const progress = objectiveProgress[obj.id] || 0;
              const status = progress >= obj.requiredValue ? '✓' : '○';
              objectivesString += `${status} ${obj.objectiveText} (${progress}/${obj.requiredValue})\n`;
            });
            objectivesText.setText(objectivesString);
          };

          // Check mission completion
          this.time.addEvent({
            delay: 500,
            callback: () => {
              updateObjectivesDisplay();
              
              const allCompleted = objectives.every((obj) => {
                const progress = objectiveProgress[obj.id] || 0;
                return progress >= obj.requiredValue;
              });

              if (allCompleted && objectives.length > 0) {
                if (onMissionComplete) {
                  onMissionComplete();
                }
              }
            },
            loop: true,
          });
        },
      },
    };

    // Create game
    gameRef.current = new Phaser.Game(config);

    // Cleanup
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [missionId, missionData, characterEquipment, onObjectiveComplete, onMissionComplete]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

