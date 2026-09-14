import React, { useEffect, useMemo, useRef, useState } from "react";
import Styles from "../css/style.module.css";

const EMOJI_GROUPS = [
  {
    id: "smileys",
    label: "Smileys",
    emojis: [
      { emoji: "😀", name: "grinning", keywords: "smile happy grin face" },
      { emoji: "😃", name: "smiley", keywords: "smile happy joy face" },
      { emoji: "😄", name: "smile", keywords: "happy laugh joy face" },
      { emoji: "😁", name: "beaming", keywords: "grin smile teeth happy" },
      { emoji: "😆", name: "laughing", keywords: "lol haha happy laugh" },
      { emoji: "😅", name: "sweat smile", keywords: "nervous relief laugh" },
      { emoji: "😂", name: "joy", keywords: "laugh cry lol funny tears" },
      { emoji: "🤣", name: "rofl", keywords: "laugh funny rolling floor" },
      { emoji: "😊", name: "blush", keywords: "smile happy shy kind" },
      { emoji: "😇", name: "innocent", keywords: "angel halo smile good" },
      { emoji: "🙂", name: "slight smile", keywords: "smile happy calm" },
      { emoji: "😉", name: "wink", keywords: "flirt joke wink eye" },
      { emoji: "😍", name: "heart eyes", keywords: "love crush like heart" },
      { emoji: "🥰", name: "smiling hearts", keywords: "love adore cute" },
      { emoji: "😘", name: "kiss", keywords: "love kiss face blow" },
      { emoji: "😗", name: "kissing", keywords: "kiss face love" },
      { emoji: "😋", name: "yum", keywords: "tasty delicious tongue food" },
      { emoji: "😜", name: "wink tongue", keywords: "joke silly playful" },
      { emoji: "🤪", name: "zany", keywords: "crazy goofy silly wild" },
      { emoji: "😝", name: "squint tongue", keywords: "joke silly playful" },
      { emoji: "🤑", name: "money face", keywords: "rich money dollar" },
      { emoji: "🤗", name: "hug", keywords: "hug welcome friendly" },
      { emoji: "🤭", name: "hand over mouth", keywords: "oops secret giggle" },
      { emoji: "🤫", name: "shush", keywords: "quiet secret silence" },
      { emoji: "🤔", name: "thinking", keywords: "hmm think consider" },
      { emoji: "😐", name: "neutral", keywords: "meh blank straight" },
      { emoji: "😑", name: "expressionless", keywords: "blank meh annoyed" },
      { emoji: "😶", name: "no mouth", keywords: "silent speechless" },
      { emoji: "🙄", name: "eye roll", keywords: "whatever annoyed sarcastic" },
      { emoji: "😏", name: "smirk", keywords: "smug flirt confident" },
      { emoji: "😣", name: "persevere", keywords: "struggle stressed" },
      { emoji: "😥", name: "sad sweat", keywords: "disappointed relief" },
      { emoji: "😮", name: "open mouth", keywords: "wow surprise shocked" },
      { emoji: "🤐", name: "zipper mouth", keywords: "secret quiet silent" },
      { emoji: "😯", name: "hushed", keywords: "surprise wow shocked" },
      { emoji: "😪", name: "sleepy", keywords: "tired sleep sad" },
      { emoji: "😫", name: "tired", keywords: "exhausted stressed" },
      { emoji: "🥱", name: "yawn", keywords: "tired bored sleepy" },
      { emoji: "😴", name: "sleeping", keywords: "sleep tired zzz rest" },
      { emoji: "😌", name: "relieved", keywords: "calm peace content" },
      { emoji: "😛", name: "tongue", keywords: "playful joke silly" },
      { emoji: "😒", name: "unamused", keywords: "meh annoyed bored" },
      { emoji: "😓", name: "downcast", keywords: "sweat sad tired" },
      { emoji: "😔", name: "pensive", keywords: "sad sorry down" },
      { emoji: "😕", name: "confused", keywords: "unsure puzzled sad" },
      { emoji: "🙃", name: "upside down", keywords: "silly sarcasm joke" },
      { emoji: "🫠", name: "melting", keywords: "hot dissolve overwhelmed" },
      { emoji: "😞", name: "disappointed", keywords: "sad down unhappy" },
      { emoji: "😟", name: "worried", keywords: "concern anxious sad" },
      { emoji: "😤", name: "triumph", keywords: "proud steam angry" },
      { emoji: "😢", name: "cry", keywords: "sad tear unhappy" },
      { emoji: "😭", name: "sob", keywords: "cry sad tears loud" },
      { emoji: "😱", name: "scream", keywords: "shock fear scared" },
      { emoji: "😳", name: "flushed", keywords: "embarrassed shy surprise" },
      { emoji: "🤯", name: "exploding head", keywords: "mind blown shock wow" },
      { emoji: "😡", name: "angry", keywords: "mad rage red angry" },
    ],
  },
  {
    id: "gestures",
    label: "Gestures",
    emojis: [
      { emoji: "👍", name: "thumbs up", keywords: "like yes good ok approve" },
      { emoji: "👎", name: "thumbs down", keywords: "no dislike bad reject" },
      { emoji: "👏", name: "clap", keywords: "applause bravo good job" },
      { emoji: "🙌", name: "raised hands", keywords: "hooray celebrate praise" },
      { emoji: "🤝", name: "handshake", keywords: "deal agree partner meet" },
      { emoji: "🙏", name: "folded hands", keywords: "please thanks pray hope" },
      { emoji: "👌", name: "ok hand", keywords: "okay perfect yes" },
      { emoji: "✌️", name: "victory", keywords: "peace two yes win" },
      { emoji: "🤞", name: "crossed fingers", keywords: "luck hope wish" },
      { emoji: "🤟", name: "love you", keywords: "ily love gesture" },
      { emoji: "🤘", name: "rock on", keywords: "metal horns cool" },
      { emoji: "👈", name: "point left", keywords: "left direction" },
      { emoji: "👉", name: "point right", keywords: "right direction" },
      { emoji: "👆", name: "point up", keywords: "up direction" },
      { emoji: "👇", name: "point down", keywords: "down direction" },
      { emoji: "👋", name: "wave", keywords: "hello hi bye greeting" },
      { emoji: "💪", name: "flex", keywords: "strong muscle power gym" },
      { emoji: "👀", name: "eyes", keywords: "look see watch peek" },
    ],
  },
  {
    id: "hearts",
    label: "Hearts",
    emojis: [
      { emoji: "❤️", name: "red heart", keywords: "love like heart romance" },
      { emoji: "🧡", name: "orange heart", keywords: "love heart" },
      { emoji: "💛", name: "yellow heart", keywords: "love heart friendship" },
      { emoji: "💚", name: "green heart", keywords: "love heart" },
      { emoji: "💙", name: "blue heart", keywords: "love heart" },
      { emoji: "💜", name: "purple heart", keywords: "love heart" },
      { emoji: "🖤", name: "black heart", keywords: "love heart dark" },
      { emoji: "🤍", name: "white heart", keywords: "love heart" },
      { emoji: "🤎", name: "brown heart", keywords: "love heart" },
      { emoji: "💔", name: "broken heart", keywords: "sad breakup heart" },
      { emoji: "❣️", name: "heart exclamation", keywords: "love heart" },
      { emoji: "💕", name: "two hearts", keywords: "love hearts cute" },
      { emoji: "💞", name: "revolving hearts", keywords: "love hearts" },
      { emoji: "💓", name: "beating heart", keywords: "love heartbeat" },
      { emoji: "💗", name: "growing heart", keywords: "love heart" },
      { emoji: "💖", name: "sparkling heart", keywords: "love sparkle heart" },
      { emoji: "💘", name: "heart arrow", keywords: "love cupid crush" },
      { emoji: "💝", name: "heart gift", keywords: "love gift valentine" },
    ],
  },
  {
    id: "objects",
    label: "Objects",
    emojis: [
      { emoji: "✅", name: "check", keywords: "done yes tick complete ok" },
      { emoji: "❌", name: "cross", keywords: "no cancel wrong delete" },
      { emoji: "⭐", name: "star", keywords: "favorite rating shine" },
      { emoji: "🔥", name: "fire", keywords: "hot lit flame popular" },
      { emoji: "💯", name: "hundred", keywords: "100 perfect score" },
      { emoji: "🎉", name: "party", keywords: "celebrate congrats tada" },
      { emoji: "🎊", name: "confetti", keywords: "party celebrate" },
      { emoji: "🎈", name: "balloon", keywords: "party birthday" },
      { emoji: "📌", name: "pin", keywords: "pushpin location mark" },
      { emoji: "📎", name: "paperclip", keywords: "attach clip file" },
      { emoji: "📝", name: "memo", keywords: "note write edit document" },
      { emoji: "📁", name: "folder", keywords: "file directory" },
      { emoji: "📂", name: "open folder", keywords: "file directory" },
      { emoji: "📅", name: "calendar", keywords: "date schedule event" },
      { emoji: "⏰", name: "alarm", keywords: "time clock reminder" },
      { emoji: "💡", name: "bulb", keywords: "idea light think" },
      { emoji: "🔒", name: "lock", keywords: "secure private closed" },
      { emoji: "🔓", name: "unlock", keywords: "open unlock security" },
      { emoji: "📧", name: "email", keywords: "mail message inbox" },
      { emoji: "📞", name: "phone", keywords: "call telephone contact" },
      { emoji: "💻", name: "laptop", keywords: "computer work pc" },
      { emoji: "📱", name: "mobile", keywords: "phone smartphone" },
    ],
  },
];

const ALL_CATEGORY = "all";

function matchesQuery(item, term) {
  if (!term) return true;
  const haystack = `${item.emoji} ${item.name} ${item.keywords}`.toLowerCase();
  return term.split(/\s+/).every((word) => haystack.includes(word));
}

export default function EmojiPicker({ handleEmojiSelect }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const searchRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchRef.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const term = query.trim().toLowerCase();

  const visibleGroups = useMemo(() => {
    const source =
      activeCategory === ALL_CATEGORY
        ? EMOJI_GROUPS
        : EMOJI_GROUPS.filter((group) => group.id === activeCategory);

    return source
      .map((group) => ({
        ...group,
        emojis: group.emojis.filter((item) => matchesQuery(item, term)),
      }))
      .filter((group) => group.emojis.length > 0);
  }, [activeCategory, term]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    searchRef.current?.focus();
  };

  return (
    <div className={Styles.emojiPickerBox}>
      <div className={Styles.emojiSearchWrap}>
        <input
          ref={searchRef}
          type="text"
          className={Styles.emojiSearchInput}
          placeholder="Search smile, heart, fire..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          aria-label="Search emoji"
        />
        {query && (
          <button
            type="button"
            className={Styles.emojiSearchClear}
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className={Styles.emojiCategoryRow} role="tablist">
        <button
          type="button"
          role="tab"
          className={`${Styles.emojiCategoryBtn} ${
            activeCategory === ALL_CATEGORY ? Styles.emojiCategoryActive : ""
          }`}
          onClick={() => setActiveCategory(ALL_CATEGORY)}
        >
          All
        </button>
        {EMOJI_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            className={`${Styles.emojiCategoryBtn} ${
              activeCategory === group.id ? Styles.emojiCategoryActive : ""
            }`}
            onClick={() => setActiveCategory(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>

      {visibleGroups.length === 0 ? (
        <div className={Styles.emojiEmptyState}>
          No emoji found for “{query.trim()}”
        </div>
      ) : (
        <div className={Styles.emojiResults}>
          {visibleGroups.map((group) => (
            <div key={group.id} className={Styles.emojiGroup}>
              <div className={Styles.emojiGroupLabel}>{group.label}</div>
              <div className={Styles.emojiGrid}>
                {group.emojis.map((item) => (
                  <button
                    key={`${group.id}-${item.emoji}`}
                    type="button"
                    className={Styles.emojiCell}
                    onClick={(e) => handleEmojiSelect(e, item.emoji)}
                    title={item.name}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
