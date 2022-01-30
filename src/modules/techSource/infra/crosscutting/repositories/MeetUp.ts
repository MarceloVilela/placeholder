import IMeetUpRepository from '@modules/techSource/repositories/IMeetUpRepository';
import MeetUpData from '@modules/techSource/infra/crosscutting/schemas/MeetUpData';
import axios from 'axios';

class MeetUp implements IMeetUpRepository {

  async listMeetUp(): Promise<MeetUpData[]> {
    const url = 'https://www.meetup.com/gql';
    const payload = {
      "operationName": "categorySearch",
      "variables": {
        "first": 20,
        "lat": -22.8,
        "lon": -43.42,
        "topicCategoryId": 546,
        "startDateRange": "2022-01-27T04:05:58-05:00[US/Eastern]",
        "sortField": "RELEVANCE"
      },
      "extensions": {
        "persistedQuery": {
          "version": 1,
          "sha256Hash": "2da619517717dc3655f08c2bbb1bd3364ebc16e1555c9a63a77b1a274d054a94"
        }
      }
    };
    const { data } = await axios.post(url, payload);

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
