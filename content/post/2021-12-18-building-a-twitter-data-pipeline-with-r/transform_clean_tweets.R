
transform_and_clean_tweets <- function(filename, remove_rts = TRUE){

  # Import the normalize_text function
  source("normalize_text.R")

  # Parse the .json file given by the Twitter API into an R data frame
  df <- ndjson::stream_in(filename)
  # If remove_rst = TRUE, filter out all the retweets from the stream
  if(remove_rts == TRUE){
    df <- filter(df,df$retweeted == FALSE)
  }
  # Keep only the tweets that are in English
  df <- filter(df, df$lang == "en")
  # Select the features that you want to keep from the Twitter stream and rename them
  # so the names match those of the columns in the Tweet_Data table in our database
  small_df <- df[,c("user.name","text","created_at")]
  names(small_df) <- c("User","Tweet_Content","Date_Created")
  # Finally normalize the tweet text
  small_df$Tweet_Content <- sapply(small_df$Tweet_Content, normalize_text)
  # Return the processed data frame
  return(small_df)
}
