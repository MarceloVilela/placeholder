import IMeetUpRepository from '@modules/techSource/repositories/IMeetUpRepository';
import MeetUpData from '@modules/techSource/infra/crosscutting/schemas/MeetUpData';
import loadJson from '@shared/utils/loadJson';

class MeetUp implements IMeetUpRepository {

  async listMeetUp(): Promise<MeetUpData[]> {


    const filePath = './src/assets/fakes/html/tech-source/meetup/category.json';

    const { data } = await loadJson({ filePath });

    const getContent = (node: any) => (

      {
        link: node.eventUrl,
        title: node.title,
        date: node.dateTime,
        owner: node.group.slug,
        address: node.group.city
      }

    )

    const listMeet = data.data.rankedEvents.edges
      .map(({ node }: any) => getContent(node))

    return listMeet
  }
}

export default MeetUp;
