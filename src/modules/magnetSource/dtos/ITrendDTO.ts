import Answer from '@modules/magnetSource/repositories/schemas/Answer';

export default interface ITrendDTO {
  top: Answer[];
  recents: Answer[];
}
