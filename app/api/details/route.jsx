import { NextResponse } from 'next/server';
import { getResponseFromAPI } from '@/models/main_course_generator/loader';

export async function POST(request) {
  try {
    const data = await request.json();

    
    // Log or process the data (e.g., save to a database)
    console.log('Received data:', data);

    let response = await getResponseFromAPI(data)

    if (data.details?.type == 0) {

      let split_list = response.split('\n')
      let projectId = split_list[0]
      let courseData = split_list.slice(1).join('\n')


      console.log(`>>> Project ID: ${projectId}`)
      console.log(`>>> Json Formatted Response from API : \n\n ${courseData}`)

      return NextResponse.json(
        { message: 'Data received successfully', receivedData: data, projectId : projectId, courseData : courseData },
        { status: 200 }
      );
    } else {
      console.log(`>>> Chat Response from API : \n\n ${response}`)
      return NextResponse.json(
        { message: 'Data received successfully', receivedData: data, chatResponse : response },
      { status: 200 }
    );
  }
  } catch (error) {
    console.error('Error processing data:', error);
    return NextResponse.json(
      { message: 'Error processing data', error: error.message },
      { status: 500 }
    );
  }
}


