/**
 * A wizard can cast a spell if they have the spell prepared.
 * They can also cast it from a scroll even if it is not prepared.
 * @param {boolean} isSpellPrepared - whether the spell is prepared
 * @param {boolean} hasScroll - whether the wizard has a scroll of the spell
 * @returns {boolean} whether the wizard can cast the spell
 */
function canCastSpell(isSpellPrepared, hasScroll) {
  return hasScroll || isSpellPrepared;
}

/**
 * A creature is hidden from an observer if it is actively hiding
 * or if the observer is not aware of it.
 * @param {boolean} hiding - whether the creature is actively hiding
 * @param {boolean} aware - whether the observer is aware of the creature
 * @returns {boolean} whether the creature is hidden from the observer
 */
function isHidden(hiding, aware) {
  return hiding || !aware;
}

/**
 * A strike hits if the attack value is greater than or equal
 * to the target's armor class (AC).
 * @param {number} attack - the attack value
 * @param {number} ac - the armor class to beat
 * @returns {boolean} whether the strike hits
 */
function doesStrikeHit(attack, ac) {
  return attack >= ac;
}

/**
 * A strike is a critical hit if the attack value is at least
 * 10 greater than the target's armor class (AC).
 * @param {number} attack - the attack value
 * @param {number} ac - the armor class to beat
 * @returns {boolean} whether the strike is a critical hit
 */
function doesStrikeCrit(attack, ac) {
  // attack: 32, AC: 20, expression 32 - 20 = 12, 12 >= 10 yes
  return attack - ac >= 10;
}

/**
 * A creature can restore hit points (HP) by healing,
 * but its total HP cannot exceed its maximum HP.
 * @param {number} maxHp - maximum hit points
 * @param {number} currentHp - current hit points
 * @param {number} healAmount - amount to heal
 * @returns {number} total hit points after healing
 */
function heal(maxHp, currentHp, healAmount) {
  // If the both added is more than max, return max. Otherwise, return hp healed
  if (currentHp + healAmount > maxHp) {
    return maxHp;
  }
  return currentHp + healAmount;
}

/**
 * When a character uses a skill they have proficiency in,
 * they get to add a bonus to their attempt.
 *
 * | Rank       | Bonus     |
 * | ---        | ---       |
 * | untrained  | 0         |
 * | trained    | level + 2 |
 * | expert     | level + 4 |
 * | master     | level + 6 |
 * | legendary  | level + 8 |
 *
 * @param {number} level - level of the character
 * @param {string} rank - character's proficiency rank
 * @returns {number} the character's proficiency bonus
 */
function getProficiencyBonus(level, rank) {
  // Don't need else if due to returns
  if (rank == "trained") {
    return level + 2;
  }
  if (rank == "expert") {
    return level + 4;
  }
  if (rank == "master") {
    return level + 6;
  }
  if (rank == "legendary") {
    return level + 8;
  }
  // 0 instead of level?
  return 0;
}

/**
 * A creature can get a bonus to its armor class (AC) by taking cover.
 * If the creature is behind an obstacle, it gets a +2 bonus to its AC,
 * unless the creature is actively taking cover, in which case it gets
 * a +4 bonus to its AC.
 * A creature that is not behind an obstacle gets no bonus to its AC.
 * @param {boolean} behindObstacle - whether the creature is behind an obstacle
 * @param {boolean} takingCover - whether the creature is actively taking cover
 * @returns {number} the cover bonus to AC
 */
function getCoverBonus(behindObstacle, takingCover) {
  if (!behindObstacle) {
    return 0;
  }
  if (behindObstacle && takingCover) {
    return 4;
  }
  // If behind obstacle but not taking cover. We don't care about not behind but taking cover
  return 2;
}

/**
 * A creature's current hit points (HP) is reduced by taking damage.
 * If the damage taken is greater than or equal to double its maximum
 * HP, the creature dies instantly.
 * A creature's HP cannot go below 0 unless it is dead.
 * @param {number} maxHp - maximum hit points
 * @param {number} currentHp - current hit points
 * @param {number} damage - damage taken
 * @returns {number} -1 if the creature dies instantly
 * @returns {number} 0 if the creature's HP drops to 0 or below
 * @returns {number} the creature's remaining HP after taking damage
 */
function getRemainingHp(maxHp, currentHp, damage) {
  if (damage >= 2 * maxHp) {
    return -1;
  }
  // This should hanndle negative hp as well...
  return Math.max(currentHp - damage, 0);
  // if (currentHp - damage <= 0) {
  //   return 0;
  // }
  // return currentHp - damage;
}

/**
 * All creatures can see in bright light.
 * Creatures with low-light vision can also see in dim light.
 * Creatures with darkvision can see in all light conditions.
 * @param {string} light - light condition: "bright", "dim", or "dark"
 * @param {string} vision - vision type: "average", "low-light", or "dark"
 * @returns {boolean} whether the creature can see
 */
function canSee(light, vision) {
  console.log(`light: ${light}, vision: ${vision}`);
  if (vision === "dark" || light === "bright") {
    return true;
  }
  // Now vision can't be dark and light can't be bright
  if (vision === "low-light" && light !== "dark") {
    return true;
  }
  // Now vision can't be low-light because dark was done and low-light was tested with bright and dim
  // This leaves vision of average, and since light can't be bright, any combination will fail.
  return false;
}

/**
 * A strike deals damage if it hits, unless the strike is a critical hit,
 * in which case it deals double damage.
 * If the strike does not hit, it deals 0 damage.
 * Hint: you can use the functions you wrote above :)
 * @param {number} attack - the attack value
 * @param {number} ac - the armor class to beat
 * @param {number} damage - damage on a normal hit
 * @returns {number} damage dealt by the strike
 */
function getStrikeDamage(attack, ac, damage) {
  console.log(`attack: ${attack}, ac: ${ac}, damage: ${damage}`);
  if (doesStrikeHit(attack, ac)) {
    if (doesStrikeCrit(attack, ac)) {
      return damage * 2;
    }
    // hit no crit
    return damage;
  }
  // didn't hit
  return 0;
}

// IIFE to test
(function testCode() {
  console.log("----- canCastSpell -----");
  console.log(canCastSpell(false, false));
  console.log(canCastSpell(false, true));
  console.log(canCastSpell(true, false));
  console.log(canCastSpell(true, true));

  console.log("----- isHidden -----");
  console.log(isHidden(false, false));
  console.log(isHidden(false, true));
  console.log(isHidden(true, false));
  console.log(isHidden(true, true));

  console.log("----- doesStrikeHit -----");
  console.log(doesStrikeHit(10, 10));
  console.log(doesStrikeHit(10, 9));
  console.log(doesStrikeHit(10, 11));

  console.log("----- doesStrikeCrit -----");
  console.log(doesStrikeCrit(20, 10));
  console.log(doesStrikeCrit(20, 11));
  console.log(doesStrikeCrit(20, 9));

  console.log("----- heal -----");
  console.log(heal(100, 50, 30));
  console.log(heal(100, 50, 80));

  console.log("----- getProficiencyBonus -----");
  console.log(getProficiencyBonus(10, "untrained"));
  console.log(getProficiencyBonus(10, "trained"));
  console.log(getProficiencyBonus(10, "expert"));
  console.log(getProficiencyBonus(10, "master"));
  console.log(getProficiencyBonus(10, "legendary"));

  console.log("----- getCoverBonus -----");
  console.log(getCoverBonus(false, false));
  console.log(getCoverBonus(false, true));
  console.log(getCoverBonus(true, false));
  console.log(getCoverBonus(true, true));

  console.log("----- getRemainingHp ------");
  console.log(getRemainingHp(100, 50, 25));
  console.log(getRemainingHp(100, 50, 60));
  console.log(getRemainingHp(100, 50, 200));

  console.log("----- canSee ------");
  console.log(canSee("bright", "average"));
  console.log(canSee("bright", "low-light"));
  console.log(canSee("bright", "dark"));
  console.log(canSee("dim", "average"));
  console.log(canSee("dim", "low-light"));
  console.log(canSee("dim", "dark"));
  console.log(canSee("dark", "average"));
  console.log(canSee("dark", "low-light"));
  console.log(canSee("dark", "dark"));

  console.log("----- getStrikeDamage -----");
  console.log(getStrikeDamage(20, 20, 5));
  console.log(getStrikeDamage(20, 15, 5));
  console.log(getStrikeDamage(20, 10, 5));
  console.log(getStrikeDamage(20, 21, 5));
  console.log(getStrikeDamage(20, 0, 5));
})();
