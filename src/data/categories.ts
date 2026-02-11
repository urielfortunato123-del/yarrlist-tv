import {
  Film, Tv, Gamepad2, Music, BookOpen, Newspaper,
  Globe, Shield, Swords, Drama, MonitorPlay, Download
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  url: string;
  color: string; // HSL accent for the card
}

export const categories: Category[] = [
  { id: "movies", name: "Movies & TV", icon: Film, url: "https://yarrlist.net/movies-and-tv-shows", color: "45 100% 50%" },
  { id: "anime", name: "Anime", icon: Swords, url: "https://yarrlist.net/anime-list", color: "330 80% 60%" },
  { id: "manga", name: "Manga", icon: BookOpen, url: "https://yarrlist.net/manga-list", color: "280 70% 60%" },
  { id: "sports", name: "Live Sports", icon: Tv, url: "https://yarrlist.net/sports-live-streaming", color: "140 70% 45%" },
  { id: "livetv", name: "Live TV", icon: MonitorPlay, url: "https://yarrlist.net/live-tv-list", color: "200 80% 55%" },
  { id: "torrents", name: "Torrents", icon: Download, url: "https://yarrlist.net/torrent-sites-list", color: "160 80% 45%" },
  { id: "games", name: "Games", icon: Gamepad2, url: "https://yarrlist.net/games-download-sites", color: "50 90% 55%" },
  { id: "music", name: "Music", icon: Music, url: "https://yarrlist.net/music-download-sites-list", color: "20 90% 55%" },
  { id: "ebooks", name: "eBooks", icon: Newspaper, url: "https://yarrlist.net/ebooks-list", color: "210 60% 55%" },
  { id: "comics", name: "Comics", icon: Drama, url: "https://yarrlist.net/comics-list", color: "0 75% 55%" },
  { id: "asian-drama", name: "Asian Drama", icon: Globe, url: "https://yarrlist.net/asian-drama-list", color: "300 60% 55%" },
  { id: "vpn", name: "VPN", icon: Shield, url: "https://yarrlist.net/list-with-best-vpn-service-2025", color: "170 70% 45%" },
];
