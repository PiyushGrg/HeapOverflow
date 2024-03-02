import React from 'react';
import ProfileTabs from './_components/ProfileTabs';
import Question from '@/models/QuestionModel';
import { currentUser } from '@clerk/nextjs/server';
import { getMongoUseridFromClerkId } from '@/actions/users';
import { IQuestion } from '@/interfaces';
import Answer from '@/models/AnswerModel';
import { connectDB } from '@/config/dbConfig';
import Comment from '@/models/CommentModel';

connectDB();

async function ProfilePage({searchParams}:{searchParams: any}) {

  const userData = await currentUser(); 
  const mongoId = await getMongoUseridFromClerkId(userData?.id!);

  let askedQ : IQuestion[] = [];
  let answeredQ : IQuestion[] = [];
  let savedQ : IQuestion[] = [];
  let commentedQ : IQuestion[] = [];

  const tab = searchParams.tab || 'asked';

  if (tab === 'asked') {
    askedQ = await Question.find({user: mongoId}).sort({updatedAt: -1}).populate("user");
  } 

  if(tab === 'answered') {
    answeredQ = await Answer.find({user:mongoId}).sort({updatedAt: -1}).populate("question");
  }

  if(tab === 'saved') {
    savedQ = await Question.find({savedBy : {$in: [mongoId]}});
  }

  if(tab === 'commented') {
    commentedQ = await Comment.find({user: mongoId}).sort({updatedAt: -1}).populate("question");
  }

  return (
    <div>
      <ProfileTabs
        askedQ={JSON.parse(JSON.stringify(askedQ))}
        answeredQ={JSON.parse(JSON.stringify(answeredQ.map((answer:any) => answer.question)))}
        savedQ={JSON.parse(JSON.stringify(savedQ))}
        commentedQ={JSON.parse(JSON.stringify(commentedQ.map((comment:any) => comment.question)))}
        mongoId={mongoId.toString()}
      />
    </div>
  )
}

export default ProfilePage;