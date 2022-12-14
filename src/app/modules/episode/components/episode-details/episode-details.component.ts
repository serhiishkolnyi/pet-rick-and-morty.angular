import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {CharacterService} from "../../../character/services";
import {EpisodeService} from "../../services";
import {IEpisode} from "../../interface";

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit {
  episode: IEpisode;
  episodeCharacters: any;
  idCharacters: number[];

  constructor(private activatedRoute: ActivatedRoute, private episodeService: EpisodeService, private characterService: CharacterService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({episode}) => {
      this.episode = episode
      this.idCharacters = episode.characters.map((value:string) => +value.split('/').reverse()[0])
      this.characterService.getByIdMulti(this.idCharacters).subscribe(value => {
        this.episodeCharacters = value;
      })
    })
  }

}
